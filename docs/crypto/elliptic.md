# elliptic

```go
import "crypto/elliptic"
```

## Overview

This package implements the standard NIST P-224, P-256, P-384, and P-521 elliptic curves over prime fields.

## Functions

### GenerateKey

```go
func GenerateKey(curve Curve, rand io.Reader) (priv []byte, x, y *big.Int, err error)
```

GenerateKey returns a public/private key pair. The private key is generated using the given reader, which must return random data.

### Marshal

```go
func Marshal(curve Curve, x, y *big.Int) []byte
```

Marshal converts a point on the curve into the uncompressed form specified in SEC 1, Version 2.0, Section 2.3.3. If the point is not on the curve (or is the conventional point at infinity), the behavior is undefined.

### MarshalCompressed

```go
func MarshalCompressed(curve Curve, x, y *big.Int) []byte
```

MarshalCompressed converts a point on the curve into the compressed form specified in SEC 1, Version 2.0, Section 2.3.3. If the point is not on the curve (or is the conventional point at infinity), the behavior is undefined.

### Unmarshal

```go
func Unmarshal(curve Curve, data []byte) (x, y *big.Int)
```

Unmarshal converts a point, serialized by Marshal, into an x, y pair. It is an error if the point is not in uncompressed form, is not on the curve, or is the point at infinity. On error, x = nil.

### UnmarshalCompressed

```go
func UnmarshalCompressed(curve Curve, data []byte) (x, y *big.Int)
```

UnmarshalCompressed converts a point, serialized by MarshalCompressed, into an x, y pair. It is an error if the point is not in compressed form, is not on the curve, or is the point at infinity. On error, x = nil.

## Types

### Curve

```go
type Curve interface {
	// Params returns the parameters for the curve.
	Params() *CurveParams
	// IsOnCurve reports whether the given (x,y) lies on the curve.
	IsOnCurve(x, y *big.Int) bool
	// Add returns the sum of (x1,y1) and (x2,y2)
	Add(x1, y1, x2, y2 *big.Int) (x, y *big.Int)
	// Double returns 2*(x,y)
	Double(x1, y1 *big.Int) (x, y *big.Int)
	// ScalarMult returns k*(Bx,By) where k is a number in big-endian form.
	ScalarMult(x1, y1 *big.Int, k []byte) (x, y *big.Int)
	// ScalarBaseMult returns k*G, where G is the base point of the group
	// and k is an integer in big-endian form.
	ScalarBaseMult(k []byte) (x, y *big.Int)
}
```

A Curve represents a short-form Weierstrass curve with a=-3.

The behavior of Add, Double, and ScalarMult when the input is not a point on the curve is undefined.

Note that the conventional point at infinity (0, 0) is not considered on the curve, although it can be returned by Add, Double, ScalarMult, or ScalarBaseMult (but not the Unmarshal or UnmarshalCompressed functions).

#### P224

```go
func P224() Curve
```

P224 returns a Curve which implements NIST P-224 (FIPS 186-3, section D.2.2), also known as secp224r1. The CurveParams.Name of this Curve is "P-224".

Multiple invocations of this function will return the same value, so it can be used for equality checks and switch statements.

The cryptographic operations are implemented using constant-time algorithms.

#### P256

```go
func P256() Curve
```

P256 returns a Curve which implements NIST P-256 (FIPS 186-3, section D.2.3), also known as secp256r1 or prime256v1. The CurveParams.Name of this Curve is "P-256".

Multiple invocations of this function will return the same value, so it can be used for equality checks and switch statements.

The cryptographic operations are implemented using constant-time algorithms.

#### P384

```go
func P384() Curve
```

P384 returns a Curve which implements NIST P-384 (FIPS 186-3, section D.2.4), also known as secp384r1. The CurveParams.Name of this Curve is "P-384".

Multiple invocations of this function will return the same value, so it can be used for equality checks and switch statements.

The cryptographic operations are implemented using constant-time algorithms.

#### P521

```go
func P521() Curve
```

P521 returns a Curve which implements NIST P-521 (FIPS 186-3, section D.2.5), also known as secp521r1. The CurveParams.Name of this Curve is "P-521".

Multiple invocations of this function will return the same value, so it can be used for equality checks and switch statements.

The cryptographic operations are implemented using constant-time algorithms.

### CurveParams

```go
type CurveParams struct {
	P       *big.Int // the order of the underlying field
	N       *big.Int // the order of the base point
	B       *big.Int // the constant of the curve equation
	Gx, Gy  *big.Int // (x,y) of the base point
	BitSize int      // the size of the underlying field
	Name    string   // the canonical name of the curve
}
```

CurveParams contains the parameters of an elliptic curve and also provides a generic, non-constant time implementation of Curve.

#### (\*CurveParams) Add

```go
func (curve *CurveParams) Add(x1, y1, x2, y2 *big.Int) (*big.Int, *big.Int)
```

#### (\*CurveParams) Double

```go
func (curve *CurveParams) Double(x1, y1 *big.Int) (*big.Int, *big.Int)
```

#### (\*CurveParams) IsOnCurve

```go
func (curve *CurveParams) IsOnCurve(x, y *big.Int) bool
```

#### (\*CurveParams) Params

```go
func (curve *CurveParams) Params() *CurveParams
```

#### (\*CurveParams) ScalarBaseMult

```go
func (curve *CurveParams) ScalarBaseMult(k []byte) (*big.Int, *big.Int)
```

#### (\*CurveParams) ScalarMult

```go
func (curve *CurveParams) ScalarMult(Bx, By *big.Int, k []byte) (*big.Int, *big.Int)
```

## Source Files

- [elliptic.go](/code/crypto/elliptic/)
- [nistec.go](/code/crypto/elliptic/nistec)
- [nistec_p256.go](/code/crypto/elliptic/nistec_p256)
- [params.go](/code/crypto/elliptic/params)
