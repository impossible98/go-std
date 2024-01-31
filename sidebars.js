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
      id: 'intro',
      label: 'Intro',
    },
    {
      type: 'category',
      label: 'archive',
      collapsible: false,
      items: [
        'archive/tar',
        'archive/zip',
      ],
    },
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
          items: [
            'code/compress/gzip/gunzip',
            'code/compress/gzip/gzip',
          ],
        },
        {
          type: 'category',
          label: 'lzw',
          collapsible: false,
          items: [
            'code/compress/lzw/reader',
            'code/compress/lzw/writer',
          ],
        },
        {
          type: 'category',
          label: 'zlib',
          collapsible: false,
          items: [
            'code/compress/zlib/reader',
            'code/compress/zlib/writer',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
