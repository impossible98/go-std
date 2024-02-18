# errors

```go
import "errors"
```

## Overview

This package implements functions to manipulate errors.

The New function creates errors whose only content is a text message.

The Unwrap, Is and As functions work on errors that may wrap other errors. An error wraps another error if its type has the method

```go
Unwrap() error
```

If e.Unwrap() returns a non-nil error w, then we say that e wraps w.

Unwrap unpacks wrapped errors. If its argument's type has an Unwrap method, it calls the method once. Otherwise, it returns nil.

A simple way to create wrapped errors is to call fmt.Errorf and apply the %w verb to the error argument:

```go
errors.Unwrap(fmt.Errorf("... %w ...", ..., err, ...))
```

returns err.

Is unwraps its first argument sequentially looking for an error that matches the second. It reports whether it finds a match. It should be used in preference to simple equality checks:

```go
if errors.Is(err, fs.ErrExist)
```

is preferable to

```go
if err == fs.ErrExist
```

because the former will succeed if err wraps fs.ErrExist.

As unwraps its first argument sequentially looking for an error that can be assigned to its second argument, which must be a pointer. If it succeeds, it performs the assignment and returns true. Otherwise, it returns false. The form

```go
var perr *fs.PathError
if errors.As(err, &perr) {
	fmt.Println(perr.Path)
}
```

is preferable to

```go
if perr, ok := err.(*fs.PathError); ok {
	fmt.Println(perr.Path)
}
```

because the former will succeed if err wraps an \*fs.PathError.

## Functions

### As

```go
func As(err error, target any) bool
```

As finds the first error in err's chain that matches target, and if one is found, sets target to that error value and returns true. Otherwise, it returns false.

The chain consists of err itself followed by the sequence of errors obtained by repeatedly calling Unwrap.

An error matches target if the error's concrete value is assignable to the value pointed to by target, or if the error has a method As(interface{}) bool such that As(target) returns true. In the latter case, the As method is responsible for setting target.

An error type might provide an As method so it can be treated as if it were a different error type.

As panics if target is not a non-nil pointer to either a type that implements error, or to any interface type.

### Is

```go
func Is(err, target error) bool
```

Is reports whether any error in err's chain matches target.

The chain consists of err itself followed by the sequence of errors obtained by repeatedly calling Unwrap.

An error is considered to match a target if it is equal to that target or if it implements a method Is(error) bool such that Is(target) returns true.

An error type might provide an Is method so it can be treated as equivalent to an existing error. For example, if MyError defines

```go
func (m MyError) Is(target error) bool { return target == fs.ErrExist }
```

then Is(MyError{}, fs.ErrExist) returns true. See syscall.Errno.Is for an example in the standard library. An Is method should only shallowly compare err and the target and not call Unwrap on either.

### New

```go
func New(text string) error
```

New returns an error that formats as the given text. Each call to New returns a distinct error value even if the text is identical.

### Unwrap

```go
func Unwrap(err error) error
```

Unwrap returns the result of calling the Unwrap method on err, if err's type contains an Unwrap method returning error. Otherwise, Unwrap returns nil.

## Examples

### Package

```go
package main

import (
	"fmt"
	"time"
)

// MyError is an error implementation that includes a time and message.
type MyError struct {
	When time.Time
	What string
}

func (e MyError) Error() string {
	return fmt.Sprintf("%v: %v", e.When, e.What)
}

func oops() error {
	return MyError{
		time.Date(1989, 3, 15, 22, 30, 0, 0, time.UTC),
		"the file system has gone away",
	}
}

func main() {
	if err := oops(); err != nil {
		fmt.Println(err)
	}
}
```

**Output:**

```
1989-03-15 22:30:00 +0000 UTC: the file system has gone away
```

### As

```go
package main

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
)

func main() {
	if _, err := os.Open("non-existing"); err != nil {
		var pathError *fs.PathError
		if errors.As(err, &pathError) {
			fmt.Println("Failed at path:", pathError.Path)
		} else {
			fmt.Println(err)
		}
	}

}
```

**Output:**

```
Failed at path: non-existing
```

### Is

```go
package main

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
)

func main() {
	if _, err := os.Open("non-existing"); err != nil {
		if errors.Is(err, fs.ErrNotExist) {
			fmt.Println("file does not exist")
		} else {
			fmt.Println(err)
		}
	}

}
```

**Output:**

```
file does not exist
```

### New

```go
package main

import (
	"errors"
	"fmt"
)

func main() {
	err := errors.New("emit macho dwarf: elf header corrupted")
	if err != nil {
		fmt.Print(err)
	}
}
```

**Output:**

```
emit macho dwarf: elf header corrupted
```

### New (Errorf)

The fmt package's Errorf function lets us use the package's formatting features to create descriptive error messages.

```go
package main

import (
	"fmt"
)

func main() {
	const name, id = "bimmler", 17
	err := fmt.Errorf("user %q (id %d) not found", name, id)
	if err != nil {
		fmt.Print(err)
	}
}
```

**Output:**

```
user "bimmler" (id 17) not found
```

### Unwrap

```go
package main

import (
	"errors"
	"fmt"
)

func main() {
	err1 := errors.New("error1")
	err2 := fmt.Errorf("error2: [%w]", err1)
	fmt.Println(err2)
	fmt.Println(errors.Unwrap(err2))
	// Output
	// error2: [error1]
	// error1
}
```

## Source Files

- [errors.go](/code/errors/)
- [wrap.go](/code/errors/wrap)
