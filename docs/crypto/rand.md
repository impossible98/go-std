# rand

```go
import "crypto/rand"
```

## Overview

This package implements a cryptographically secure random number generator.

## Variables

```go
var Reader io.Reader
```

Reader is a global, shared instance of a cryptographically secure random number generator.

On Linux, FreeBSD, Dragonfly and Solaris, Reader uses getrandom(2) if available, /dev/urandom otherwise. On OpenBSD and macOS, Reader uses getentropy(2). On other Unix-like systems, Reader reads from /dev/urandom. On Windows systems, Reader uses the RtlGenRandom API. On Wasm, Reader uses the Web Crypto API.

## Functions

### Int

```go
func Int(rand io.Reader, max *big.Int) (n *big.Int, err error)
```

Int returns a uniform random value in [0, max). It panics if max \<= 0.

### Prime

```go
func Prime(rand io.Reader, bits int) (*big.Int, error)
```

Prime returns a number of the given bit length that is prime with high probability. Prime will return error for any error returned by rand.Read or if bits < 2.

### Read

```go
func Read(b []byte) (n int, err error)
```

Read is a helper function that calls Reader.Read using io.ReadFull. On return, n == len(b) if and only if err == nil.

## Examples

### Read

This example reads 10 cryptographically secure pseudorandom numbers from rand.Reader and writes them to a byte slice.

```go
package main

import (
	"bytes"
	"crypto/rand"
	"fmt"
)

func main() {
	c := 10
	b := make([]byte, c)
	_, err := rand.Read(b)
	if err != nil {
		fmt.Println("error:", err)
		return
	}
	// The slice should now contain random bytes instead of only zeroes.
	fmt.Println(bytes.Equal(b, make([]byte, c)))

}
```

**Output:**

```
false
```

## Source Files

- [rand.go](/code/crypto/rand/)
- [rand_getrandom.go](/code/crypto/rand/rand_getrandom)
- [rand_unix.go](/code/crypto/rand/rand_unix)
- [util.go](/code/crypto/rand/util)
