# buildinfo

```go
import "debug/buildinfo"
```

## Overview

This package provides access to information embedded in a Go binary about how it was built. This includes the Go toolchain version, and the set of modules used (for binaries built in module mode).

Build information is available for the currently running binary in runtime/debug.ReadBuildInfo.

## Types

### BuildInfo

```go
type BuildInfo = debug.BuildInfo
```

Type alias for build info. We cannot move the types here, since runtime/debug would need to import this package, which would make it a much larger dependency.

#### Read

```go
func Read(r io.ReaderAt) (*BuildInfo, error)
```

Read returns build information embedded in a Go binary file accessed through the given ReaderAt. Most information is only available for binaries built with module support.

#### ReadFile

```go
func ReadFile(name string) (info *BuildInfo, err error)
```

ReadFile returns build information embedded in a Go binary file at the given path. Most information is only available for binaries built with module support.

## Source Files

- [buildinfo.go](/code/debug/buildinfo/)
