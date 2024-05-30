### 파일 처리

Go 언어에서는 파일 입출력을 포함한 다양한 파일 처리 작업을 쉽게 수행할 수 있도록 `os` 및 `io/ioutil` 패키지를 제공합니다. 오늘은 Go에서 파일을 다루는 방법에 대해 학습하겠습니다. 또한 파일 및 디렉토리 권한 설정에 대해서도 살펴보겠습니다.

#### 1. 파일 열기 모드

파일을 열 때 다양한 모드를 사용할 수 있습니다. `os.OpenFile` 함수는 파일을 다양한 모드로 열 수 있게 해줍니다.

- `os.O_RDONLY` : 읽기 전용
- `os.O_WRONLY` : 쓰기 전용
- `os.O_RDWR` : 읽기 및 쓰기
- `os.O_APPEND` : 파일 끝에 추가
- `os.O_CREATE` : 파일이 없으면 생성
- `os.O_TRUNC` : 파일을 열 때 크기를 0으로 설정

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // 파일을 읽기 및 쓰기 모드로 열기
    file, err := os.OpenFile("example.txt", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0644)
    if err != nil {
        fmt.Println(err)
        return
    }
    defer file.Close()

    // 파일에 데이터 쓰기
    data := []byte("Appending this text.\n")
    _, err = file.Write(data)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("Data appended to file")
}
```

#### 2. 파일 복사

파일을 복사하는 방법입니다. `io.Copy` 함수를 사용하여 파일을 복사할 수 있습니다.

```go
package main

import (
    "fmt"
    "io"
    "os"
)

func main() {
    srcFile, err := os.Open("example.txt")
    if err != nil {
        fmt.Println(err)
        return
    }
    defer srcFile.Close()

    destFile, err := os.Create("example_copy.txt")
    if err != nil {
        fmt.Println(err)
        return
    }
    defer destFile.Close()

    _, err = io.Copy(destFile, srcFile)
    if err != nil {
        fmt.Println(err)
        return
    }

    fmt.Println("File copied successfully")
}
```

#### 3. 파일 이동 및 이름 변경

파일을 이동하거나 이름을 변경하는 방법입니다. `os.Rename` 함수를 사용합니다.

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // 파일 이름 변경
    err := os.Rename("example_copy.txt", "example_renamed.txt")
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("File renamed successfully")

    // 파일 이동 (이름 변경과 같은 방법 사용)
    err = os.Rename("example_renamed.txt", "new_directory/example_renamed.txt")
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("File moved successfully")
}
```

#### 4. 심볼릭 링크 및 하드 링크

Go에서는 심볼릭 링크와 하드 링크를 생성할 수 있습니다.

##### 심볼릭 링크

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // 심볼릭 링크 생성
    err := os.Symlink("example.txt", "example_symlink.txt")
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("Symbolic link created")
}
```

##### 하드 링크

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // 하드 링크 생성
    err := os.Link("example.txt", "example_hardlink.txt")
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("Hard link created")
}
```

#### 5. 파일 권한 변경

파일 권한을 변경하는 방법입니다. `os.Chmod` 함수를 사용합니다.

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // 파일 권한 변경
    err := os.Chmod("example.txt", 0644)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("File permissions changed")
}
```

#### 6. 파일 소유자 변경

파일 소유자를 변경하는 방법입니다. `os.Chown` 함수를 사용합니다.

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // 파일 소유자 변경 (예: UID=1000, GID=1000)
    err := os.Chown("example.txt", 1000, 1000)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("File ownership changed")
}
```

#### 7. 파일 트렁크

파일을 지정된 크기로 자르는 방법입니다. `os.Truncate` 함수를 사용합니다.

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // 파일을 100바이트로 자르기
    err := os.Truncate("example.txt", 100)
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("File truncated")
}
```

#### 8. 임시 파일 및 디렉토리 생성

임시 파일 및 디렉토리를 생성하는 방법입니다. `os.CreateTemp`와 `os.MkdirTemp` 함수를 사용합니다.

##### 임시 파일 생성

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // 임시 파일 생성
    tempFile, err := os.CreateTemp("", "example_*.txt")
    if err != nil {
        fmt.Println(err)
        return
    }
    defer tempFile.Close()
    fmt.Println("Temporary file created:", tempFile.Name())
}
```

##### 임시 디렉토리 생성

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    // 임시 디렉토리 생성
    tempDir, err := os.MkdirTemp("", "example_dir_*")
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println("Temporary directory created:", tempDir)
}
```

#### 9. 파일 시스템 탐색

디렉토리를 재귀적으로 탐색하는 방법입니다. `filepath.Walk` 함수를 사용합니다.

```go
package main

import (
    "fmt"
    "path/filepath"
)

func main() {
    root := "."

    // 디렉토리 재귀적으로 탐색
    err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
        if err != nil {
            return err
        }
        fmt.Println(path)
        return nil
    })
    if err != nil {
        fmt.Println(err)
        return
    }
}
```
