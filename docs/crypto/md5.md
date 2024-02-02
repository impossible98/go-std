# md5

```go
import "crypto/md5"
```

## Overview

This package implements the MD5 hash algorithm as defined in RFC 1321.

MD5 is cryptographically broken and should not be used for secure applications.

## Constants

```go
const BlockSize = 64
```

The blocksize of MD5 in bytes.

```go
const Size = 16
```

The size of an MD5 checksum in bytes.

## Functions

### New

```go
func New() hash.Hash
```

New returns a new hash.Hash computing the MD5 checksum. The Hash also implements encoding.BinaryMarshaler and encoding.BinaryUnmarshaler to marshal and unmarshal the internal state of the hash.

### Sum

```go
func Sum(data []byte) [Size]byte
```

Sum returns the MD5 checksum of the data.

## Examples

### New

```go
package main

import (
	"crypto/md5"
	"fmt"
	"io"
)

func main() {
	h := md5.New()
	io.WriteString(h, "The fog is getting thicker!")
	io.WriteString(h, "And Leon's getting laaarger!")
	fmt.Printf("%x", h.Sum(nil))
}
```

**Output:**

```
e2c569be17396eca2a2e3c11578123ed
```

### New (File)

```go
package main

import (
	"crypto/md5"
	"fmt"
	"io"
	"log"
	"os"
)

func main() {
	f, err := os.Open("file.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	h := md5.New()
	if _, err := io.Copy(h, f); err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%x", h.Sum(nil))
}
```

### Sum

```go
package main

import (
	"crypto/md5"
	"fmt"
)

func main() {
	data := []byte("These pretzels are making me thirsty.")
	fmt.Printf("%x", md5.Sum(data))
}
```

**Output:**

```
b0804ec967f48520697662a204f5fe72
```

## Source Files

- [md5.go](/code/crypto/md5/)
- [md5block.go](/code/crypto/md5/md5block)
- [md5block_decl.go](/code/crypto/md5/md5block_decl)
