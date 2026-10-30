# 설치·실행 명령어 모음

**README의 시작 문구를 AI에게 주면 된다. 이 명령을 전부 직접 실행할 필요는 없다.** AI 요청문은 [RUNBOOK](RUNBOOK.md), 레포 선택은 [REPOSITORIES.md](REPOSITORIES.md)에서 관리한다. 여기서는 터미널 명령을 모았다.

| 상황 | 볼 곳 | 외부 연결 |
| --- | --- | --- |
| 받은 Workkit 사용 | 1~2번 | 불필요. 내부 Browser 연결은 필요 |
| 로컬 파일 확인 | 3번 | 불필요 |
| 이미 설치된 라이브러리 활용 | 4번 | 아래 예시는 로컬 파일만 사용 |
| 개인 사전 연습용 설치 | 5번 | 패키지·의존성 수신 필요. 응시 중 설치 지시가 아님 |

한 줄씩 실행하고 오류가 나면 원인을 확인한다. python이 없으면 이미 있는 python3 또는 Windows의 py를 확인해 실행기 이름만 바꾼다. `input.csv`, `input.json`, `input.pdf`는 실제 허용된 입력으로 바꿀 **자리표시자**이며 저장소의 정답 파일이 아니다.

## 1. 사용 가능한 도구 확인

```sh
git --version
node --version
python --version
```

Workkit 서버는 **Node 18.2 이상**을 기준으로 한다. 없으면 환경을 업데이트하지 말고 MD·제공 PDF 미리보기를 사용한다. 아래 명령은 라이브러리를 찾을 수 있는지만 확인하며 실제 import·작업 성공을 보장하지 않는다.

```sh
python -c "import importlib.util as u; print({n: u.find_spec(n) is not None for n in ['pandas', 'pypdf', 'pdfplumber', 'duckdb']})"
```

## 2. Workkit 받기와 열기

이미 clone했다면 첫 명령을 건너뛴다. 최초 clone은 운영 안내가 허용한 저장소 접근이 가능할 때만 수행한다. 같은 폴더가 있는데 다시 clone하거나 덮어쓰지 않는다.

```sh
git clone https://github.com/zittenyetten/cofa-probe-kit.git
```

clone 폴더의 상위 위치에서 로컬 상태·버전을 확인한다. 원격 갱신은 하지 않는다.

```sh
git -C cofa-probe-kit status --short
git -C cofa-probe-kit rev-parse --short HEAD
```

그 폴더로 이동해 읽거나 서버를 켠다.

```sh
cd cofa-probe-kit
python -X utf8 -c "from pathlib import Path; print(Path('README.md').read_text(encoding='utf-8'))"
node serve.mjs --port 8000
```

파일 목록에서 README를 직접 열어도 된다. 서버 터미널을 유지하고 사람이 내부 Browser의 **PORT = 실제 포트 숫자**, **URL = `/`**를 입력한다. 8000이 사용 중이면 빈 포트를 확인해 숫자만 바꾼다. 종료는 그 서버 터미널에서 `Ctrl+C`다. 다른 프로세스를 종료하지 않는다.

제공 파일 미리보기의 대안 경로는 `output/pdf/hy-school2-notes-images.pdf`(이미지 원문), `output/pdf/hy-school2-notes-text.pdf`(텍스트 원문), `references/semiconductor-glossary.md`(검수 용어집)다.

## 3. 추가 설치 없이 로컬 파일 확인

**이 절부터는 공개 Workkit 밖의 해당 과제 폴더에서 실행한다.** 입력은 읽기만 한다. 작은 파일의 초기 구조 확인 예시이며 업무 검증을 완성하는 명령은 아니다.

CSV 헤더·파싱된 레코드 수 확인. UTF-8/BOM·쉼표 구분 전제이므로 인코딩·구분자는 실제 파일에 맞춘다.

```sh
python -c "import csv; f=open('input.csv',encoding='utf-8-sig',newline=''); r=csv.reader(f); print('columns:',next(r,[])); print('rows:',sum(1 for _ in r)); f.close()"
```

레코드 수는 물리적인 줄 수와 다를 수 있다. 이것만으로 열 개수 불일치·누락·중복·업무 계산을 검증한 것은 아니다.

JSON 파싱·보기 좋은 출력. 스키마·업무 규칙 검사는 아니다.

```sh
python -m json.tool input.json
```

## 4. 이미 설치된 라이브러리만 실행

3번과 같은 과제 폴더에서 필요한 예시만 실행한다. 5번 가상환경에 설치했다면 아래 python을 **그 가상환경의 Python 경로**로 바꾼다. 다른 Python에 설치한 패키지는 현재 Python에서 보이지 않을 수 있다.

### pandas — CSV 구조

```sh
python -c "import pandas as pd; d=pd.read_csv('input.csv',dtype=str,keep_default_na=False,encoding='utf-8-sig'); print('shape:',d.shape); print('columns:',d.columns.tolist())"
```

문자열로 읽어 코드 앞자리 0과 빈 문자열을 임의 변환하지 않는 예시다. 숫자형·결측 정의는 업무 규칙을 확인한 뒤 정한다. 필터·집계·결합 검증은 별도다.

### pypdf — 페이지 수와 첫 페이지 텍스트

```sh
python -X utf8 -c "from pypdf import PdfReader; r=PdfReader('input.pdf'); print('pages:',len(r.pages)); print((r.pages[0].extract_text() or '[추출 텍스트 없음]') if r.pages else '[페이지 없음]')"
```

### pdfplumber — 첫 페이지 텍스트

```sh
python -X utf8 -c "import pdfplumber; p=pdfplumber.open('input.pdf'); print((p.pages[0].extract_text() or '[추출 텍스트 없음]') if p.pages else '[페이지 없음]'); p.close()"
```

두 PDF 예시는 OCR·표 정확성 검증이 아니다. 추출이 없거나 순서가 이상하면 제공 미리보기의 원문 페이지와 대조한다. `python -m pdfplumber`를 실행 명령으로 가정하지 않는다.

### DuckDB — SQL 시작 확인

```sh
python -c "import duckdb; print(duckdb.sql('SELECT 1 AS ok').fetchall())"
```

공식 API를 대조한 예시이며 **이번 제작 환경에서는 DuckDB 실행을 검증하지 않았다.** 데이터 작업에는 로컬 파일·기본 기능을 선택하며 원격 URL·확장 다운로드를 전제로 구성하지 않는다.

## 5. 개인 사전 연습 환경에서만 설치

**응시 환경의 설치 명령이 아니다.** 인터넷·설치가 허용된 개인 연습 폴더에서 기존 도구로 부족할 때만 선택한다. Workkit 사용 자체에는 필요 없다. 제공 Codex·모델·시스템 Python을 업데이트하는 명령은 넣지 않았다.

현재 위치가 개인 연습 폴더인지 확인한다. 기존 `.venv-prep`가 있으면 덮어 만들지 말고 그 Python을 확인한다. 새 환경은 한 번만 만든다.

```sh
python -m venv .venv-prep
```

활성화나 실행 정책 변경 없이 가상환경의 Python을 직접 쓴다. 아래는 **pandas 하나를 선택한 경우**다. PDF 작업이면 pandas 자리를 pypdf 또는 pdfplumber로, SQL이면 duckdb로 바꾼다. 모두 설치하라는 지시가 아니다.

Windows PowerShell:

```powershell
.\.venv-prep\Scripts\python.exe -m pip install pandas
.\.venv-prep\Scripts\python.exe -m pip check
```

Linux/macOS 셸:

```sh
./.venv-prep/bin/python -m pip install pandas
./.venv-prep/bin/python -m pip check
```

Windows Git Bash에서 Windows Python으로 만든 환경이면 bin/python 대신 `./.venv-prep/Scripts/python.exe`를 쓴다. 자신의 환경 한 가지만 선택한다. 설치가 차단되면 반복 시도·프록시·터널 우회 없이 기존 도구로 돌아간다. 개인 PC의 환경·패키지 파일을 시험에 업로드해도 된다는 뜻이 아니다.

설치 버전은 배포 시점에 달라지므로 아래 제작 검사 버전과 같다고 보장하지 않는다. pip check는 의존성 충돌 확인이며 파일 처리 정확성 검증은 아니다.

## 6. 검증 범위와 출처

- Windows 제작 환경의 Node 22.16.0, Python 3.12.14/3.13.3으로 기본 명령과 로컬 파일 예시를 확인했다. pandas 3.0.1, pypdf 6.10.0, pdfplumber 0.11.9의 작은 가상 입력을 사용했다. 최신 버전 표기가 아니다.
- 가상환경 생성·pip 실행 확인과 실제 패키지 설치를 구분한다. 새 패키지를 설치하지 않았고 설치 명령은 공식 문서와 대조했다. Linux/macOS 셸·DuckDB·실제 Probe 실행은 미검증이다.
- [Python venv](https://docs.python.org/3/library/venv.html), [pip 사용법](https://pip.pypa.io/en/stable/user_guide/), [CSV](https://docs.python.org/3/library/csv.html), [JSON](https://docs.python.org/3/library/json.html), [Node 종료 API](https://nodejs.org/api/http.html#servercloseidleconnections). 라이브러리별 근거는 [레포 모음](REPOSITORIES.md)에 연결했다.

실제 질문·프롬프트·데이터·결과는 과제 공간에만 둔다. 이 명령 모음에 커밋·push·외부 전송 절차를 추가하지 않는다.
