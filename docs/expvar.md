# expvar

```go
import "expvar"
```

## Overview

This package provides a standardized interface to public variables, such as operation counters in servers. It exposes these variables via HTTP at /debug/vars in JSON format.

Operations to set or modify these public variables are atomic.

In addition to adding the HTTP handler, this package registers the following variables:

```
cmdline   os.Args
memstats  runtime.Memstats
```

The package is sometimes only imported for the side effect of registering its HTTP handler and the above variables. To use it this way, link this package into your program:

```go
import _ "expvar"
```

## Functions

### Do

```go
func Do(f func(KeyValue))
```

Do calls f for each exported variable. The global variable map is locked during the iteration, but existing entries may be concurrently updated.

### Handler

```go
func Handler() http.Handler
```

Handler returns the expvar HTTP Handler.

This is only needed to install the handler in a non-standard location.

### Publish

```go
func Publish(name string, v Var)
```

Publish declares a named exported variable. This should be called from a package's init function when it creates its Vars. If the name is already registered then this will log.Panic.

## Types

### Float

```go
type Float struct {
	// contains filtered or unexported fields
}
```

Float is a 64-bit float variable that satisfies the Var interface.

#### NewFloat

```go
func NewFloat(name string) *Float
```

#### (\*Float) Add

```go
func (v *Float) Add(delta float64)
```

Add adds delta to v.

#### (\*Float) Set

```go
func (v *Float) Set(value float64)
```

Set sets v to value.

#### (\*Float) String

```go
func (v *Float) String() string
```

#### (\*Float) Value

```go
func (v *Float) Value() float64
```

### Func

```go
type Func func() any
```

Func implements Var by calling the function and formatting the returned value using JSON.

#### (Func) String

```go
func (f Func) String() string
```

#### (Func) Value

```go
func (f Func) Value() any
```

### type Int

```go
type Int struct {
	// contains filtered or unexported fields
}
```

Int is a 64-bit integer variable that satisfies the Var interface.

#### NewInt

```go
func NewInt(name string) *Int
```

#### (\*Int) Add

```go
func (v *Int) Add(delta int64)
```

#### (\*Int) Set

```go
func (v *Int) Set(value int64)
```

#### (\*Int) String

```go
func (v *Int) String() string
```

#### (\*Int) Value

```go
func (v *Int) Value() int64
```

### KeyValue

```go
type KeyValue struct {
	Key   string
	Value Var
}
```

KeyValue represents a single entry in a Map.

### Map

```go
type Map struct {
	// contains filtered or unexported fields
}
```

Map is a string-to-Var map variable that satisfies the Var interface.

#### NewMap

```go
func NewMap(name string) *Map
```

#### (\*Map) Add

```go
func (v *Map) Add(key string, delta int64)
```

Add adds delta to the \*Int value stored under the given map key.

#### (\*Map) AddFloat

```go
func (v *Map) AddFloat(key string, delta float64)
```

AddFloat adds delta to the \*Float value stored under the given map key.

#### (\*Map) Delete

```go
func (v *Map) Delete(key string)
```

Delete deletes the given key from the map.

#### (\*Map) Do

```go
func (v *Map) Do(f func(KeyValue))
```

Do calls f for each entry in the map. The map is locked during the iteration, but existing entries may be concurrently updated.

#### (\*Map) Get

```go
func (v *Map) Get(key string) Var
```

#### (\*Map) Init

```go
func (v *Map) Init() *Map
```

Init removes all keys from the map.

#### (\*Map) Set

```go
func (v *Map) Set(key string, av Var)
```

#### (\*Map) String

```go
func (v *Map) String() string
```

### String

```go
type String struct {
	// contains filtered or unexported fields
}
```

String is a string variable, and satisfies the Var interface.

#### NewString

```go
func NewString(name string) *String
```

#### (\*String) Set

```go
func (v *String) Set(value string)
```

#### (\*String) String

```go
func (v *String) String() string
```

String implements the Var interface. To get the unquoted string use Value.

#### (\*String) Value

```go
func (v *String) Value() string
```

### Var

```go
type Var interface {
	// String returns a valid JSON value for the variable.
	// Types with String methods that do not return valid JSON
	// (such as time.Time) must not be used as a Var.
	String() string
}
```

Var is an abstract type for all exported variables.

#### Get

```go
func Get(name string) Var
```

Get retrieves a named exported variable. It returns nil if the name has not been registered.

## Source Files

- [expvar.go](/code/expvar/)
