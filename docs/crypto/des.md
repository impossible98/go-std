# des

```go
import "crypto/des"
```

## Overview

This package implements the Data Encryption Standard (DES) and the Triple Data Encryption Algorithm (TDEA) as defined in U.S. Federal Information Processing Standards Publication 46-3.

DES is cryptographically broken and should not be used for secure applications.

## Constants

```go
const BlockSize = 8
```

The DES block size in bytes.

## Functions

### NewCipher

```go
func NewCipher(key []byte) (cipher.Block, error)
```

NewCipher creates and returns a new cipher.Block.

### NewTripleDESCipher

```go
func NewTripleDESCipher(key []byte) (cipher.Block, error)
```

NewTripleDESCipher creates and returns a new cipher.Block.

## Types

### KeySizeError

```go
type KeySizeError int
```

#### (KeySizeError) Error

```go
func (k KeySizeError) Error() string
```

## Examples

### NewTripleDESCipher

```go
package main

import (
	"crypto/des"
)

func main() {
	// NewTripleDESCipher can also be used when EDE2 is required by
	// duplicating the first 8 bytes of the 16-byte key.
	ede2Key := []byte("example key 1234")

	var tripleDESKey []byte
	tripleDESKey = append(tripleDESKey, ede2Key[:16]...)
	tripleDESKey = append(tripleDESKey, ede2Key[:8]...)

	_, err := des.NewTripleDESCipher(tripleDESKey)
	if err != nil {
		panic(err)
	}

	// See crypto/cipher for how to use a cipher.Block for encryption and
	// decryption.
}
```

## Source Files

- [block.go](/code/crypto/des/block)
- [cipher.go](/code/crypto/des/cipher)
- [const.go](/code/crypto/des/const)
