/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  stdSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'What is Go?',
    },
    {
      type: 'category',
      label: 'archive',
      items: ['archive/tar', 'archive/zip'],
    },
    'bufio',
    'builtin',
    'bytes',
    {
      type: 'category',
      label: 'compress',
      items: [
        'compress/bzip2',
        'compress/flate',
        'compress/gzip',
        'compress/lzw',
        'compress/zlib',
      ],
    },
    {
      type: 'category',
      label: 'container',
      items: ['container/heap', 'container/list', 'container/ring'],
    },
    'context',
    {
      type: 'category',
      label: 'crypto',
      link: {
        type: 'doc',
        id: 'crypto/index',
      },
      items: [
        'crypto/aes',
        'crypto/cipher',
        'crypto/des',
        'crypto/dsa',
        'crypto/ecdsa',
        'crypto/ed25519',
        'crypto/elliptic',
        'crypto/hmac',
        'crypto/md5',
        'crypto/rand',
        'crypto/rc4',
        'crypto/rsa',
      ],
    },
    {
      type: 'category',
      label: 'database',
      items: [
        {
          type: 'category',
          label: 'sql',
          link: {
            type: 'doc',
            id: 'database/sql',
          },
          items: ['database/sql/driver'],
        },
      ],
    },
    {
      type: 'category',
      label: 'debug',
      items: ['debug/buildinfo'],
    },
    'embed',
    'errors',
    'expvar',
    'flag',
    'fmt',
    {
      type: 'category',
      label: 'os',
      link: {
        type: 'doc',
        id: 'os/index',
      },
      items: ['os/exec', 'os/signal', 'os/user'],
    },
    'plugin',
    {
      type: 'category',
      label: 'runtime',
      link: {
        type: 'doc',
        id: 'runtime/index',
      },
      items: ['runtime/cgo'],
    },
    'sort',
    {
      type: 'category',
      label: 'syscall',
      link: {
        type: 'doc',
        id: 'syscall/index',
      },
      items: ['syscall/js'],
    },
    {
      type: 'category',
      label: 'unicode',
      link: {
        type: 'doc',
        id: 'unicode/index',
      },
      items: ['unicode/utf16', 'unicode/utf8'],
    },
    'unsafe',
  ],
  codeSidebar: [
    {
      type: 'doc',
      id: 'code/index',
      label: 'Intro',
    },
    {
      type: 'category',
      label: 'archive',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'tar',
          items: [
            'code/archive/tar/common',
            'code/archive/tar/format',
            'code/archive/tar/reader',
            'code/archive/tar/stat_actime1',
            'code/archive/tar/stat_unix',
            'code/archive/tar/strconv',
            'code/archive/tar/writer',
          ],
        },
        {
          type: 'category',
          label: 'zip',
          items: [
            'code/archive/zip/reader',
            'code/archive/zip/register',
            'code/archive/zip/struct',
            'code/archive/zip/writer',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'bufio',
      items: ['code/bufio/bufio', 'code/bufio/scan'],
    },
    {
      type: 'category',
      label: 'builtin',
      items: ['code/builtin/builtin'],
    },
    {
      type: 'category',
      label: 'bytes',
      items: ['code/bytes/buffer', 'code/bytes/bytes', 'code/bytes/reader'],
    },
    {
      type: 'category',
      label: 'compress',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'bzip2',
          items: [
            'code/compress/bzip2/bit_reader',
            'code/compress/bzip2/bzip2',
            'code/compress/bzip2/huffman',
            'code/compress/bzip2/move_to_front',
          ],
        },
        {
          type: 'category',
          label: 'flate',
          items: [
            'code/compress/flate/deflate',
            'code/compress/flate/deflatefast',
            'code/compress/flate/dict_decoder',
            'code/compress/flate/huffman_bit_writer',
            'code/compress/flate/huffman_code',
            'code/compress/flate/inflate',
            'code/compress/flate/token',
          ],
        },
        {
          type: 'category',
          label: 'gzip',
          items: ['code/compress/gzip/gunzip', 'code/compress/gzip/gzip'],
        },
        {
          type: 'category',
          label: 'lzw',
          items: ['code/compress/lzw/reader', 'code/compress/lzw/writer'],
        },
        {
          type: 'category',
          label: 'zlib',
          items: ['code/compress/zlib/reader', 'code/compress/zlib/writer'],
        },
      ],
    },
    {
      type: 'category',
      label: 'container',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'heap',
          items: ['code/container/heap/heap'],
        },
        {
          type: 'category',
          label: 'list',
          items: ['code/container/list/list'],
        },
        {
          type: 'category',
          label: 'ring',
          items: ['code/container/ring/ring'],
        },
      ],
    },
    {
      type: 'category',
      label: 'context',
      items: ['code/context/context'],
    },
    {
      type: 'category',
      label: 'crypto',
      items: [
        'code/crypto/crypto',
        {
          type: 'category',
          label: 'aes',
          items: [
            'code/crypto/aes/aes_gcm',
            'code/crypto/aes/block',
            'code/crypto/aes/cipher_asm',
            'code/crypto/aes/cipher',
            'code/crypto/aes/const',
            'code/crypto/aes/modes',
          ],
        },
        {
          type: 'category',
          label: 'cipher',
          items: [
            'code/crypto/cipher/cbc',
            'code/crypto/cipher/cfb',
            'code/crypto/cipher/cipher',
            'code/crypto/cipher/ctr',
            'code/crypto/cipher/gcm',
            'code/crypto/cipher/io',
            'code/crypto/cipher/ofb',
            'code/crypto/cipher/xor_amd64',
          ],
        },
        {
          type: 'category',
          label: 'des',
          items: [
            'code/crypto/des/block',
            'code/crypto/des/cipher',
            'code/crypto/des/const',
          ],
        },
        {
          type: 'category',
          label: 'dsa',
          items: ['code/crypto/dsa/dsa'],
        },
        {
          type: 'category',
          label: 'ecdsa',
          items: [
            'code/crypto/ecdsa/ecdsa',
            'code/crypto/ecdsa/ecdsa_noasm',
            'code/crypto/ecdsa/notboring',
          ],
        },
        {
          type: 'category',
          label: 'ed25519',
          items: ['code/crypto/ed25519/ed25519'],
        },
        {
          type: 'category',
          label: 'elliptic',
          items: [
            'code/crypto/elliptic/elliptic',
            'code/crypto/elliptic/nistec',
            'code/crypto/elliptic/nistec',
            'code/crypto/elliptic/params',
          ],
        },
        {
          type: 'category',
          label: 'hmac',
          items: ['code/crypto/hmac/hmac'],
        },
        {
          type: 'category',
          label: 'md5',
          items: [
            'code/crypto/md5/md5',
            'code/crypto/md5/md5block',
            'code/crypto/md5/md5block_decl',
          ],
        },
        {
          type: 'category',
          label: 'rand',
          items: [
            'code/crypto/rand/rand',
            'code/crypto/rand/rand_getrandom',
            'code/crypto/rand/rand_unix',
            'code/crypto/rand/util',
          ],
        },
        {
          type: 'category',
          label: 'rc4',
          items: ['code/crypto/rc4/rc4'],
        },
        {
          type: 'category',
          label: 'rsa',
          items: [
            'code/crypto/rsa/notboring',
            'code/crypto/rsa/pkcs1v15',
            'code/crypto/rsa/pss',
            'code/crypto/rsa/rsa',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'database',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'sql',
          items: [
            'code/database/sql/convert',
            'code/database/sql/ctxutil',
            'code/database/sql/sql',
            {
              type: 'category',
              label: 'driver',
              items: [
                'code/database/sql/driver/driver',
                'code/database/sql/driver/types',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'debug',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'buildinfo',
          items: ['code/debug/buildinfo/buildinfo'],
        },
      ],
    },
    {
      type: 'category',
      label: 'embed',
      items: ['code/embed/embed'],
    },
    {
      type: 'category',
      label: 'errors',
      items: ['code/errors/errors', 'code/errors/wrap'],
    },
    {
      type: 'category',
      label: 'expvar',
      items: ['code/expvar/expvar'],
    },
    {
      type: 'category',
      label: 'flag',
      items: ['code/flag/flag'],
    },
    {
      type: 'category',
      label: 'fmt',
      items: [
        'code/fmt/doc',
        'code/fmt/errors',
        'code/fmt/format',
        'code/fmt/print',
        'code/fmt/scan',
      ],
    },
    {
      type: 'category',
      label: 'plugin',
      items: ['code/plugin/plugin', 'code/plugin/plugin_dlopen'],
    },
    {
      type: 'category',
      label: 'os',
      items: [
        'code/os/dir',
        'code/os/dir_unix',
        'code/os/dirent_linux',
        'code/os/endian_little',
        'code/os/error',
        'code/os/error_errno',
        'code/os/error_posix',
        'code/os/exec',
        'code/os/exec_posix',
        'code/os/exec_unix',
        'code/os/executable',
        'code/os/executable_procfs',
        'code/os/file',
        'code/os/file_posix',
        'code/os/file_unix',
        'code/os/getwd',
        'code/os/path',
        'code/os/path_unix',
        'code/os/pipe2_unix',
        'code/os/proc',
        'code/os/rawconn',
        'code/os/readfrom_linux',
        'code/os/removeall_at',
        'code/os/rlimit',
        'code/os/rlimit_stub',
        'code/os/stat',
        'code/os/stat_linux',
        'code/os/stat_unix',
        'code/os/sticky_notbsd',
        'code/os/str',
        'code/os/sys',
        'code/os/sys_linux',
        'code/os/sys_unix',
        'code/os/tempfile',
        'code/os/types',
        'code/os/types_unix',
        'code/os/wait_waitid',
        {
          type: 'category',
          label: 'exec',
          items: [
            'code/os/exec/exec',
            'code/os/exec/exec_unix',
            'code/os/exec/lp_unix',
          ],
        },
        {
          type: 'category',
          label: 'signal',
          items: [
            'code/os/signal/doc',
            'code/os/signal/signal',
            'code/os/signal/signal_unix',
          ],
        },
        {
          type: 'category',
          label: 'user',
          items: [
            'code/os/user/cgo_listgroups_unix',
            'code/os/user/cgo_lookup_unix',
            'code/os/user/getgrouplist_unix',
            'code/os/user/lookup',
            'code/os/user/user',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'runtime',
      items: [
        'code/runtime/alg',
        'code/runtime/asan0',
        'code/runtime/atomic_pointer',
        'code/runtime/cgo',
        'code/runtime/cgo_mmap',
        'code/runtime/cgo_sigaction',
        'code/runtime/cgocall',
        'code/runtime/cgocallback',
        'code/runtime/cgocheck',
        'code/runtime/chan',
        'code/runtime/checkptr',
        'code/runtime/compiler',
        'code/runtime/complex',
        'code/runtime/cpuflags',
        'code/runtime/cpuflags_amd64',
        'code/runtime/cpuprof',
        'code/runtime/cputicks',
        'code/runtime/debug',
        'code/runtime/debugcall',
        'code/runtime/debuglog',
        'code/runtime/debuglog_off',
        'code/runtime/defs_linux_amd64',
        'code/runtime/env_posix',
        'code/runtime/error',
        'code/runtime/extern',
        'code/runtime/fastlog2',
        'code/runtime/fastlog2table',
        'code/runtime/float',
        'code/runtime/hash64',
        'code/runtime/heapdump',
        'code/runtime/histogram',
        'code/runtime/iface',
        'code/runtime/lfstack',
        'code/runtime/lfstack_64bit',
        'code/runtime/lock_futex',
        'code/runtime/lockrank',
        'code/runtime/lockrank_off',
        'code/runtime/malloc',
        'code/runtime/map',
        'code/runtime/map_fast32',
        'code/runtime/map_fast64',
        'code/runtime/map_faststr',
        'code/runtime/mbarrier',
        'code/runtime/mbitmap',
        'code/runtime/mcache',
        'code/runtime/mcentral',
        'code/runtime/mcheckmark',
        'code/runtime/mem',
        'code/runtime/mem_linux',
        'code/runtime/metrics',
        'code/runtime/mfinal',
        'code/runtime/mfixalloc',
        'code/runtime/mgc',
        'code/runtime/mgclimit',
        'code/runtime/mgcmark',
        'code/runtime/mgcpacer',
        'code/runtime/mgcscavenge',
        'code/runtime/mgcstack',
        'code/runtime/mgcsweep',
        'code/runtime/mgcwork',
        'code/runtime/mheap',
        'code/runtime/mpagealloc',
        'code/runtime/mpagealloc_64bit',
        'code/runtime/mpagecache',
        'code/runtime/mpallocbits',
        'code/runtime/mprof',
        'code/runtime/mranges',
        'code/runtime/msan0',
        'code/runtime/msize',
        'code/runtime/mspanset',
        'code/runtime/mstats',
        'code/runtime/mwbbuf',
        'code/runtime/nbpipe_pipe2',
        'code/runtime/netpoll',
        'code/runtime/netpoll_epoll',
        'code/runtime/os_linux',
        'code/runtime/os_linux_generic',
        'code/runtime/os_linux_noauxv',
        'code/runtime/os_linux_x86',
        'code/runtime/os_nonopenbsd',
        'code/runtime/panic',
        'code/runtime/plugin',
        'code/runtime/preempt',
        'code/runtime/preempt_nonwindows',
        'code/runtime/print',
        'code/runtime/proc',
        'code/runtime/profbuf',
        'code/runtime/proflabel',
        'code/runtime/race0',
        'code/runtime/rdebug',
        'code/runtime/relax_stub',
        'code/runtime/runtime',
        'code/runtime/runtime1',
        'code/runtime/runtime2',
        'code/runtime/runtime_boring',
        'code/runtime/rwmutex',
        'code/runtime/select',
        'code/runtime/sema',
        'code/runtime/signal_amd64',
        'code/runtime/signal_linux_amd64',
        'code/runtime/signal_unix',
        'code/runtime/sigqueue',
        'code/runtime/sigqueue_note',
        'code/runtime/sigtab_linux_generic',
        'code/runtime/sizeclasses',
        'code/runtime/slice',
        'code/runtime/softfloat64',
        'code/runtime/stack',
        'code/runtime/string',
        'code/runtime/stubs',
        'code/runtime/stubs2',
        'code/runtime/stubs3',
        'code/runtime/stubs_amd64',
        'code/runtime/stubs_linux',
        'code/runtime/symtab',
        'code/runtime/sys_nonppc64x',
        'code/runtime/sys_x86',
        'code/runtime/time',
        'code/runtime/time_nofake',
        'code/runtime/timeasm',
        'code/runtime/tls_stub',
        'code/runtime/trace',
        'code/runtime/traceback',
        'code/runtime/type',
        'code/runtime/typekind',
        'code/runtime/utf8',
        'code/runtime/vdso_elf64',
        'code/runtime/vdso_linux',
        'code/runtime/vdso_linux_amd64',
        'code/runtime/write_err',
        {
          type: 'category',
          label: 'cgo',
          items: [
            'code/runtime/cgo/callbacks',
            'code/runtime/cgo/callbacks_traceback',
            'code/runtime/cgo/cgo',
            'code/runtime/cgo/handle',
            'code/runtime/cgo/iscgo',
            'code/runtime/cgo/linux',
            'code/runtime/cgo/mmap',
            'code/runtime/cgo/setenv',
            'code/runtime/cgo/sigaction',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'sort',
      items: [
        'code/sort/search',
        'code/sort/slice',
        'code/sort/slice_go113',
        'code/sort/sort',
        'code/sort/zsortfunc',
        'code/sort/zsortinterface',
      ],
    },
    {
      type: 'category',
      label: 'syscall',
      items: [
        'code/syscall/asan0',
        'code/syscall/dirent',
        'code/syscall/endian_little',
        'code/syscall/env_unix',
        'code/syscall/exec_linux',
        'code/syscall/exec_unix',
        'code/syscall/flock',
        'code/syscall/lsf_linux',
        'code/syscall/msan0',
        'code/syscall/net',
        'code/syscall/netlink_linux',
        'code/syscall/setuidgid_linux',
        'code/syscall/sock_cloexec_linux',
        'code/syscall/sockcmsg_linux',
        'code/syscall/sockcmsg_unix',
        'code/syscall/sockcmsg_unix_other',
        'code/syscall/syscall',
        'code/syscall/syscall_linux',
        'code/syscall/syscall_linux_accept4',
        'code/syscall/syscall_linux_amd64',
        'code/syscall/syscall_unix',
        'code/syscall/time_nofake',
        'code/syscall/timestruct',
        'code/syscall/zerrors_linux_amd64',
        'code/syscall/zsyscall_linux_amd64',
        'code/syscall/zsysnum_linux_amd64',
        'code/syscall/ztypes_linux_amd64',
        {
          type: 'category',
          label: 'js',
          items: ['code/syscall/js/func', 'code/syscall/js/js'],
        },
      ],
    },
    {
      type: 'category',
      label: 'unicode',
      items: [
        'code/unicode/casetables',
        'code/unicode/digit',
        'code/unicode/graphic',
        'code/unicode/letter',
        'code/unicode/tables',
        {
          type: 'category',
          label: 'utf16',
          items: ['code/unicode/utf16/utf16'],
        },
        {
          type: 'category',
          label: 'utf16',
          items: ['code/unicode/utf8/utf8'],
        },
      ],
    },
    {
      type: 'category',
      label: 'unsafe',
      items: ['code/unsafe/unsafe'],
    },
  ],
};

export default sidebars;
