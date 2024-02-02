# rc4

```go
import "crypto/rc4"
```

## Overview

This package implements RC4 encryption, as defined in Bruce Schneier's Applied Cryptography.

RC4 is cryptographically broken and should not be used for secure applications.

## Types

### Cipher

```go
type Cipher struct {
	// contains filtered or unexported fields
}
```

A Cipher is an instance of RC4 using a particular key.

#### NewCipher

```go
func NewCipher(key []byte) (*Cipher, error)
```

NewCipher creates and returns a new Cipher. The key argument should be the RC4 key, at least 1 byte and at most 256 bytes.

#### (\*Cipher) XORKeyStream

```go
func (c *Cipher) XORKeyStream(dst, src []byte)
```

XORKeyStream sets dst to the result of XORing src with the key stream.
Dst and src must overlap entirely or not at all.

### KeySizeError

```go
type KeySizeError int
```

#### (KeySizeError) Error

```go
func (k KeySizeError) Error() string
```

## Source Files

- [rc4.go](/code/crypto/rc4/)
