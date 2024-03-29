# lockrank.go

```go showLineNumbers
// Copyright 2020 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// This file records the static ranks of the locks in the runtime. If a lock
// is not given a rank, then it is assumed to be a leaf lock, which means no other
// lock can be acquired while it is held. Therefore, leaf locks do not need to be
// given an explicit rank. We list all of the architecture-independent leaf locks
// for documentation purposes, but don't list any of the architecture-dependent
// locks (which are all leaf locks). debugLock is ignored for ranking, since it is used
// when printing out lock ranking errors.
//
// lockInit(l *mutex, rank int) is used to set the rank of lock before it is used.
// If there is no clear place to initialize a lock, then the rank of a lock can be
// specified during the lock call itself via lockWithrank(l *mutex, rank int).
//
// Besides the static lock ranking (which is a total ordering of the locks), we
// also represent and enforce the actual partial order among the locks in the
// arcs[] array below. That is, if it is possible that lock B can be acquired when
// lock A is the previous acquired lock that is still held, then there should be
// an entry for A in arcs[B][]. We will currently fail not only if the total order
// (the lock ranking) is violated, but also if there is a missing entry in the
// partial order.

package runtime

type lockRank int

// Constants representing the lock rank of the architecture-independent locks in
// the runtime. Locks with lower rank must be taken before locks with higher
// rank.
const (
	lockRankDummy lockRank = iota

	// Locks held above sched
	lockRankSysmon
	lockRankScavenge
	lockRankForcegc
	lockRankSweepWaiters
	lockRankAssistQueue
	lockRankCpuprof
	lockRankSweep

	lockRankPollDesc
	lockRankSched
	lockRankDeadlock
	lockRankAllg
	lockRankAllp

	lockRankTimers // Multiple timers locked simultaneously in destroy()
	lockRankItab
	lockRankReflectOffs
	lockRankHchan // Multiple hchans acquired in lock order in syncadjustsudogs()
	lockRankTraceBuf
	lockRankFin
	lockRankNotifyList
	lockRankTraceStrings
	lockRankMspanSpecial
	lockRankProfInsert
	lockRankProfBlock
	lockRankProfMemActive
	lockRankProfMemFuture
	lockRankGcBitsArenas
	lockRankRoot
	lockRankTrace
	lockRankTraceStackTab
	lockRankNetpollInit

	lockRankRwmutexW
	lockRankRwmutexR

	lockRankSpanSetSpine
	lockRankGscan
	lockRankStackpool
	lockRankStackLarge
	lockRankDefer
	lockRankSudog

	// Memory-related non-leaf locks
	lockRankWbufSpans
	lockRankMheap
	lockRankMheapSpecial

	// Memory-related leaf locks
	lockRankGlobalAlloc
	lockRankPageAllocScav

	// Other leaf locks
	lockRankGFree
	// Generally, hchan must be acquired before gscan. But in one specific
	// case (in syncadjustsudogs from markroot after the g has been suspended
	// by suspendG), we allow gscan to be acquired, and then an hchan lock. To
	// allow this case, we get this lockRankHchanLeaf rank in
	// syncadjustsudogs(), rather than lockRankHchan. By using this special
	// rank, we don't allow any further locks to be acquired other than more
	// hchan locks.
	lockRankHchanLeaf
	lockRankPanic

	// Leaf locks with no dependencies, so these constants are not actually used anywhere.
	// There are other architecture-dependent leaf locks as well.
	lockRankNewmHandoff
	lockRankDebugPtrmask
	lockRankFaketimeState
	lockRankTicks
	lockRankRaceFini
	lockRankPollCache
	lockRankDebug
)

// lockRankLeafRank is the rank of lock that does not have a declared rank, and hence is
// a leaf lock.
const lockRankLeafRank lockRank = 1000

// lockNames gives the names associated with each of the above ranks
var lockNames = []string{
	lockRankDummy: "",

	lockRankSysmon:       "sysmon",
	lockRankScavenge:     "scavenge",
	lockRankForcegc:      "forcegc",
	lockRankSweepWaiters: "sweepWaiters",
	lockRankAssistQueue:  "assistQueue",
	lockRankCpuprof:      "cpuprof",
	lockRankSweep:        "sweep",

	lockRankPollDesc: "pollDesc",
	lockRankSched:    "sched",
	lockRankDeadlock: "deadlock",
	lockRankAllg:     "allg",
	lockRankAllp:     "allp",

	lockRankTimers:      "timers",
	lockRankItab:        "itab",
	lockRankReflectOffs: "reflectOffs",

	lockRankHchan:         "hchan",
	lockRankTraceBuf:      "traceBuf",
	lockRankFin:           "fin",
	lockRankNotifyList:    "notifyList",
	lockRankTraceStrings:  "traceStrings",
	lockRankMspanSpecial:  "mspanSpecial",
	lockRankProfInsert:    "profInsert",
	lockRankProfBlock:     "profBlock",
	lockRankProfMemActive: "profMemActive",
	lockRankProfMemFuture: "profMemFuture",
	lockRankGcBitsArenas:  "gcBitsArenas",
	lockRankRoot:          "root",
	lockRankTrace:         "trace",
	lockRankTraceStackTab: "traceStackTab",
	lockRankNetpollInit:   "netpollInit",

	lockRankRwmutexW: "rwmutexW",
	lockRankRwmutexR: "rwmutexR",

	lockRankSpanSetSpine: "spanSetSpine",
	lockRankGscan:        "gscan",
	lockRankStackpool:    "stackpool",
	lockRankStackLarge:   "stackLarge",
	lockRankDefer:        "defer",
	lockRankSudog:        "sudog",

	lockRankWbufSpans:    "wbufSpans",
	lockRankMheap:        "mheap",
	lockRankMheapSpecial: "mheapSpecial",

	lockRankGlobalAlloc:   "globalAlloc.mutex",
	lockRankPageAllocScav: "pageAlloc.scav.lock",

	lockRankGFree:     "gFree",
	lockRankHchanLeaf: "hchanLeaf",
	lockRankPanic:     "panic",

	lockRankNewmHandoff:   "newmHandoff.lock",
	lockRankDebugPtrmask:  "debugPtrmask.lock",
	lockRankFaketimeState: "faketimeState.lock",
	lockRankTicks:         "ticks.lock",
	lockRankRaceFini:      "raceFiniLock",
	lockRankPollCache:     "pollCache.lock",
	lockRankDebug:         "debugLock",
}

func (rank lockRank) String() string {
	if rank == 0 {
		return "UNKNOWN"
	}
	if rank == lockRankLeafRank {
		return "LEAF"
	}
	return lockNames[rank]
}

// lockPartialOrder is a partial order among the various lock types, listing the
// immediate ordering that has actually been observed in the runtime. Each entry
// (which corresponds to a particular lock rank) specifies the list of locks
// that can already be held immediately "above" it.
//
// So, for example, the lockRankSched entry shows that all the locks preceding
// it in rank can actually be held. The allp lock shows that only the sysmon or
// sched lock can be held immediately above it when it is acquired.
var lockPartialOrder [][]lockRank = [][]lockRank{
	lockRankDummy:         {},
	lockRankSysmon:        {},
	lockRankScavenge:      {lockRankSysmon},
	lockRankForcegc:       {lockRankSysmon},
	lockRankSweepWaiters:  {},
	lockRankAssistQueue:   {},
	lockRankCpuprof:       {},
	lockRankSweep:         {},
	lockRankPollDesc:      {},
	lockRankSched:         {lockRankSysmon, lockRankScavenge, lockRankForcegc, lockRankSweepWaiters, lockRankAssistQueue, lockRankCpuprof, lockRankSweep, lockRankPollDesc},
	lockRankDeadlock:      {lockRankDeadlock},
	lockRankAllg:          {lockRankSysmon, lockRankSched},
	lockRankAllp:          {lockRankSysmon, lockRankSched},
	lockRankTimers:        {lockRankSysmon, lockRankScavenge, lockRankPollDesc, lockRankSched, lockRankAllp, lockRankTimers},
	lockRankItab:          {},
	lockRankReflectOffs:   {lockRankItab},
	lockRankHchan:         {lockRankScavenge, lockRankSweep, lockRankHchan},
	lockRankTraceBuf:      {lockRankSysmon, lockRankScavenge},
	lockRankFin:           {lockRankSysmon, lockRankScavenge, lockRankSched, lockRankAllg, lockRankTimers, lockRankReflectOffs, lockRankHchan, lockRankTraceBuf},
	lockRankNotifyList:    {},
	lockRankTraceStrings:  {lockRankTraceBuf},
	lockRankMspanSpecial:  {lockRankSysmon, lockRankScavenge, lockRankAssistQueue, lockRankCpuprof, lockRankSweep, lockRankSched, lockRankAllg, lockRankAllp, lockRankTimers, lockRankItab, lockRankReflectOffs, lockRankHchan, lockRankTraceBuf, lockRankNotifyList, lockRankTraceStrings},
	lockRankProfInsert:    {lockRankSysmon, lockRankScavenge, lockRankAssistQueue, lockRankCpuprof, lockRankSweep, lockRankSched, lockRankAllg, lockRankAllp, lockRankTimers, lockRankItab, lockRankReflectOffs, lockRankHchan, lockRankTraceBuf, lockRankNotifyList, lockRankTraceStrings},
	lockRankProfBlock:     {lockRankSysmon, lockRankScavenge, lockRankAssistQueue, lockRankCpuprof, lockRankSweep, lockRankSched, lockRankAllg, lockRankAllp, lockRankTimers, lockRankItab, lockRankReflectOffs, lockRankHchan, lockRankTraceBuf, lockRankNotifyList, lockRankTraceStrings},
	lockRankProfMemActive: {lockRankSysmon, lockRankScavenge, lockRankAssistQueue, lockRankCpuprof, lockRankSweep, lockRankSched, lockRankAllg, lockRankAllp, lockRankTimers, lockRankItab, lockRankReflectOffs, lockRankHchan, lockRankTraceBuf, lockRankNotifyList, lockRankTraceStrings},
	lockRankProfMemFuture: {lockRankSysmon, lockRankScavenge, lockRankAssistQueue, lockRankCpuprof, lockRankSweep, lockRankSched, lockRankAllg, lockRankAllp, lockRankTimers, lockRankItab, lockRankReflectOffs, lockRankHchan, lockRankTraceBuf, lockRankNotifyList, lockRankTraceStrings, lockRankProfMemActive},
	lockRankGcBitsArenas:  {lockRankSysmon, lockRankScavenge, lockRankAssistQueue, lockRankCpuprof, lockRankSched, lockRankAllg, lockRankTimers, lockRankItab, lockRankReflectOffs, lockRankHchan, lockRankTraceBuf, lockRankNotifyList, lockRankTraceStrings},
	lockRankRoot:          {},
	lockRankTrace:         {lockRankSysmon, lockRankScavenge, lockRankForcegc, lockRankAssistQueue, lockRankSweep, lockRankSched, lockRankHchan, lockRankTraceBuf, lockRankTraceStrings, lockRankRoot},
	lockRankTraceStackTab: {lockRankScavenge, lockRankForcegc, lockRankSweepWaiters, lockRankAssistQueue, lockRankSweep, lockRankSched, lockRankAllg, lockRankTimers, lockRankHchan, lockRankTraceBuf, lockRankFin, lockRankNotifyList, lockRankTraceStrings, lockRankRoot, lockRankTrace},
	lockRankNetpollInit:   {lockRankTimers},

	lockRankRwmutexW: {},
	lockRankRwmutexR: {lockRankSysmon, lockRankRwmutexW},

	lockRankSpanSetSpine:  {lockRankSysmon, lockRankScavenge, lockRankForcegc, lockRankAssistQueue, lockRankCpuprof, lockRankSweep, lockRankPollDesc, lockRankSched, lockRankAllg, lockRankAllp, lockRankTimers, lockRankItab, lockRankReflectOffs, lockRankHchan, lockRankTraceBuf, lockRankNotifyList, lockRankTraceStrings},
	lockRankGscan:         {lockRankSysmon, lockRankScavenge, lockRankForcegc, lockRankSweepWaiters, lockRankAssistQueue, lockRankCpuprof, lockRankSweep, lockRankPollDesc, lockRankSched, lockRankTimers, lockRankItab, lockRankReflectOffs, lockRankHchan, lockRankTraceBuf, lockRankFin, lockRankNotifyList, lockRankTraceStrings, lockRankProfInsert, lockRankProfBlock, lockRankProfMemActive, lockRankProfMemFuture, lockRankGcBitsArenas, lockRankRoot, lockRankTrace, lockRankTraceStackTab, lockRankNetpollInit, lockRankSpanSetSpine},
	lockRankStackpool:     {lockRankSysmon, lockRankScavenge, lockRankSweepWaiters, lockRankAssistQueue, lockRankCpuprof, lockRankSweep, lockRankPollDesc, lockRankSched, lockRankTimers, lockRankItab, lockRankReflectOffs, lockRankHchan, lockRankTraceBuf, lockRankFin, lockRankNotifyList, lockRankTraceStrings, lockRankProfInsert, lockRankProfBlock, lockRankProfMemActive, lockRankProfMemFuture, lockRankGcBitsArenas, lockRankRoot, lockRankTrace, lockRankTraceStackTab, lockRankNetpollInit, lockRankRwmutexR, lockRankSpanSetSpine, lockRankGscan},
	lockRankStackLarge:    {lockRankSysmon, lockRankAssistQueue, lockRankSched, lockRankItab, lockRankHchan, lockRankProfInsert, lockRankProfBlock, lockRankProfMemActive, lockRankProfMemFuture, lockRankGcBitsArenas, lockRankRoot, lockRankSpanSetSpine, lockRankGscan},
	lockRankDefer:         {},
	lockRankSudog:         {lockRankHchan, lockRankNotifyList},
	lockRankWbufSpans:     {lockRankSysmon, lockRankScavenge, lockRankSweepWaiters, lockRankAssistQueue, lockRankSweep, lockRankPollDesc, lockRankSched, lockRankAllg, lockRankTimers, lockRankItab, lockRankReflectOffs, lockRankHchan, lockRankFin, lockRankNotifyList, lockRankTraceStrings, lockRankMspanSpecial, lockRankProfInsert, lockRankProfBlock, lockRankProfMemActive, lockRankProfMemFuture, lockRankRoot, lockRankTrace, lockRankGscan, lockRankDefer, lockRankSudog},
	lockRankMheap:         {lockRankSysmon, lockRankScavenge, lockRankSweepWaiters, lockRankAssistQueue, lockRankCpuprof, lockRankSweep, lockRankPollDesc, lockRankSched, lockRankAllg, lockRankAllp, lockRankTimers, lockRankItab, lockRankReflectOffs, lockRankHchan, lockRankTraceBuf, lockRankFin, lockRankNotifyList, lockRankTraceStrings, lockRankMspanSpecial, lockRankProfInsert, lockRankProfBlock, lockRankProfMemActive, lockRankProfMemFuture, lockRankGcBitsArenas, lockRankRoot, lockRankTrace, lockRankSpanSetSpine, lockRankGscan, lockRankStackpool, lockRankStackLarge, lockRankDefer, lockRankSudog, lockRankWbufSpans},
	lockRankMheapSpecial:  {lockRankSysmon, lockRankScavenge, lockRankAssistQueue, lockRankCpuprof, lockRankSweep, lockRankPollDesc, lockRankSched, lockRankAllg, lockRankAllp, lockRankTimers, lockRankItab, lockRankReflectOffs, lockRankHchan, lockRankTraceBuf, lockRankNotifyList, lockRankTraceStrings},
	lockRankGlobalAlloc:   {lockRankProfInsert, lockRankProfBlock, lockRankProfMemActive, lockRankProfMemFuture, lockRankSpanSetSpine, lockRankMheap, lockRankMheapSpecial},
	lockRankPageAllocScav: {lockRankMheap},

	lockRankGFree:     {lockRankSched},
	lockRankHchanLeaf: {lockRankGscan, lockRankHchanLeaf},
	lockRankPanic:     {lockRankDeadlock}, // plus any other lock held on throw.

	lockRankNewmHandoff:   {},
	lockRankDebugPtrmask:  {},
	lockRankFaketimeState: {},
	lockRankTicks:         {},
	lockRankRaceFini:      {},
	lockRankPollCache:     {},
	lockRankDebug:         {},
}
```
