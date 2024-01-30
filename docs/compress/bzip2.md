# bzip2

```go
import "compress/bzip2"
```

## Overview

This package implements bzip2 decompression.

## Functions

### NewReader

```go
func NewReader(r io.Reader) io.Reader
```

NewReader returns an io.Reader which decompresses bzip2 data from r. If r does not also implement io.ByteReader, the decompressor may read more data than necessary from r.

## Types

### StructuralError

```go
type StructuralError string
```

A StructuralError is returned when the bzip2 data is found to be syntactically invalid.

#### (StructuralError) Error

```go
func (s StructuralError) Error() string
```

## Source Files

- [bit_reader.go](/code/compress/bzip2/bit_reader)
- [bzip2.go](/code/compress/bzip2/)
- [huffman.go](/code/compress/bzip2/huffman)
- [move_to_front.go](/code/compress/bzip2/move_to_front)
