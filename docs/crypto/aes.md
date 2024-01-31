# aes

```go
import "crypto/aes"
```

## Overview

This package implements AES encryption (formerly Rijndael), as defined in U.S. Federal Information Processing Standards Publication 197.

The AES operations in this package are not implemented using constant-time algorithms. An exception is when running on systems with enabled hardware support for AES that makes these operations constant-time. Examples include amd64 systems using AES-NI extensions and s390x systems using Message-Security-Assist extensions. On such systems, when the result of NewCipher is passed to cipher.NewGCM, the GHASH operation used by GCM is also constant-time.

## Constants

```go
const BlockSize = 16
```

The AES block size in bytes.

## Functions

### NewCipher

```go
func NewCipher(key []byte) (cipher.Block, error)
```

NewCipher creates and returns a new cipher.Block. The key argument should be the AES key, either 16, 24, or 32 bytes to select AES-128, AES-192, or AES-256.

## Types

### KeySizeError

```go
type KeySizeError int
```

#### (KeySizeError) Error

```go
func (k KeySizeError) Error() string
```

## Source Files

- [aes_gcm.go](/code/crypto/aes/aes_gcm)
- [block.go](/code/crypto/aes/block)
- [cipher.go](/code/crypto/aes/cipher)
- [cipher_asm.go](/code/crypto/aes/cipher_asm)
- [const.go](/code/crypto/aes/const)
- [modes.go](/code/crypto/aes/modes)
