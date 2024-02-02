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
      collapsible: false,
      items: ['archive/tar', 'archive/zip'],
    },
    'bufio',
    'builtin',
    'bytes',
    {
      type: 'category',
      label: 'compress',
      collapsible: false,
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
      collapsible: false,
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
      collapsible: false,
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
      ],
    },
    'unicode/index',
    'unsafe',
  ],
  codeSidebar: [
    {
      type: 'category',
      label: 'archive',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'tar',
          collapsible: false,
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
          collapsible: false,
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
      collapsible: false,
      items: ['code/bufio/bufio', 'code/bufio/scan'],
    },
    {
      type: 'category',
      label: 'builtin',
      collapsible: false,
      items: ['code/builtin/builtin'],
    },
    {
      type: 'category',
      label: 'bytes',
      collapsible: false,
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
          collapsible: false,
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
          collapsible: false,
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
          collapsible: false,
          items: ['code/compress/gzip/gunzip', 'code/compress/gzip/gzip'],
        },
        {
          type: 'category',
          label: 'lzw',
          collapsible: false,
          items: ['code/compress/lzw/reader', 'code/compress/lzw/writer'],
        },
        {
          type: 'category',
          label: 'zlib',
          collapsible: false,
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
          collapsible: false,
          items: ['code/container/heap/heap'],
        },
        {
          type: 'category',
          label: 'list',
          collapsible: false,
          items: ['code/container/list/list'],
        },
        {
          type: 'category',
          label: 'ring',
          collapsible: false,
          items: ['code/container/ring/ring'],
        },
      ],
    },
    {
      type: 'category',
      label: 'context',
      collapsible: false,
      items: ['code/context/context'],
    },
    {
      type: 'category',
      label: 'crypto',
      collapsible: false,
      items: [
        'code/crypto/crypto',
        {
          type: 'category',
          label: 'aes',
          collapsible: false,
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
          collapsible: false,
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
          collapsible: false,
          items: [
            'code/crypto/des/block',
            'code/crypto/des/cipher',
            'code/crypto/des/const',
          ],
        },
        {
          type: 'category',
          label: 'dsa',
          collapsible: false,
          items: ['code/crypto/dsa/dsa'],
        },
        {
          type: 'category',
          label: 'ecdsa',
          collapsible: false,
          items: [
            'code/crypto/ecdsa/ecdsa',
            'code/crypto/ecdsa/ecdsa_noasm',
            'code/crypto/ecdsa/notboring',
          ],
        },
        {
          type: 'category',
          label: 'ed25519',
          collapsible: false,
          items: ['code/crypto/ed25519/ed25519'],
        },
        {
          type: 'category',
          label: 'elliptic',
          collapsible: false,
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
          collapsible: false,
          items: ['code/crypto/hmac/hmac'],
        },
        {
          type: 'category',
          label: 'md5',
          collapsible: false,
          items: [
            'code/crypto/md5/md5',
            'code/crypto/md5/md5block',
            'code/crypto/md5/md5block_decl',
          ],
        },
        {
          type: 'category',
          label: 'rand',
          collapsible: false,
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
          collapsible: false,
          items: ['code/crypto/rc4/rc4'],
        },
      ],
    },
    {
      type: 'category',
      label: 'unicode/',
      collapsible: false,
      items: [
        'code/unicode/casetables',
        'code/unicode/digit',
        'code/unicode/graphic',
        'code/unicode/letter',
        'code/unicode/tables',
      ],
    },
    {
      type: 'category',
      label: 'unsafe',
      collapsible: false,
      items: ['code/unsafe/unsafe'],
    },
  ],
};

export default sidebars;
