# sticky_notbsd.go

```go showLineNumbers
// Copyright 2014 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

//go:build !aix && !darwin && !dragonfly && !freebsd && (!js || !wasm) && !netbsd && !openbsd && !solaris

package os

const supportsCreateWithStickyBit = true
```
