# 설치·실행 명령어 모음

**README의 시작 문구를 AI에게 주면 된다. 이 명령을 전부 직접 실행할 필요는 없다.** AI 요청문은 [RUNBOOK](RUNBOOK.md), 레포 선택은 [REPOSITORIES.md](REPOSITORIES.md)에서 관리한다. 여기서는 터미널 명령을 모았다.

| 상황 | 볼 곳 | 외부 연결 |
| --- | --- | --- |
| 받은 자료 묶음 사용 | 1~2번 | 이미 받은 파일은 불필요. 최초 clone은 허용된 GitHub 수신, HTML은 내부 Browser 연결 필요 |
| 로컬 파일 확인 | 3번 | 불필요 |
| 이미 설치된 라이브러리 활용 | 4번 | 아래 예시는 로컬 파일만 사용 |
| 개인 사전 연습용 설치 | 5번 | 패키지·의존성 수신 필요. 응시 중 설치 지시가 아님 |
| 개인 사전 연습용 ooo·omo | 6번 | 도구 설치·호스트 설정·모델 접근 등이 별도로 필요 |

한 줄씩 실행하고 오류가 나면 원인을 확인한다. python이 없으면 이미 있는 python3 또는 Windows의 py를 확인해 실행기 이름만 바꾼다. `input.csv`, `input.json`, `input.pdf`는 실제 허용된 입력으로 바꿀 **자리표시자**이며 저장소의 정답 파일이 아니다.

## 1. 사용 가능한 도구 확인

```sh
git --version
node --version
python --version
```

자료 열람 서버는 **Node 18.2 이상**을 기준으로 한다. 없으면 환경을 업데이트하지 말고 MD·제공 PDF 미리보기를 사용한다. 아래 명령은 라이브러리를 찾을 수 있는지만 확인하며 실제 import·작업 성공을 보장하지 않는다.

```sh
python -c "import importlib.util as u; print({n: u.find_spec(n) is not None for n in ['pandas', 'pypdf', 'pdfplumber', 'duckdb']})"
```

## 2. 자료 묶음 받기와 열기

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

**이 절부터는 공개 참고자료 폴더 밖의 해당 과제 폴더에서 실행한다.** 입력은 읽기만 한다. 작은 파일의 초기 구조 확인 예시이며 업무 검증을 완성하는 명령은 아니다.

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

**응시 환경의 설치 명령이 아니다.** 인터넷·설치가 허용된 개인 연습 폴더에서 기존 도구로 부족할 때만 선택한다. 이 자료 묶음 사용 자체에는 필요 없다. 제공 Codex·모델·시스템 Python을 업데이트하는 명령은 넣지 않았다.

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

## 6. 개인 사전 연습용 ooo와 omo

**인터넷·설치·호스트 설정 변경이 허용된 개인 환경에서만 선택하는 예시다. 응시용 실행 절차가 아니다.** 이 자료 묶음을 사용하거나 받은 MD를 읽는 데 필요하지 않다. 이미 설치·설정된 경우 다시 설치하지 말고 해당 호스트에서 사용한다. 아래는 공식 문서를 대조한 명령이며 이번 작업에서 실행하지 않았다. 두 도구를 모두 설치하라는 절차가 아니다. 모델·인증·외부 통신별 판단은 [레포 재점검](REPOSITORIES.md)에 있다.

### ooo · Ouroboros: 기존 Codex CLI에 연결하는 예

기존 Codex CLI의 정상 사용과 `uv` 사용 가능 여부가 전제다. Python 3.12 이상이 필요하며, 패키지·의존성·필요한 런타임 수신이 발생할 수 있다. 다른 호스트를 쓰면 [공식 시작 안내](https://github.com/Q00/ouroboros/blob/main/docs/getting-started.md)의 해당 경로를 고른다.

```sh
uv --version
uv tool install "ouroboros-ai[mcp]"
ouroboros --help
ouroboros setup --runtime codex
```

`setup`은 도구 연결·MCP·관리되는 규칙/스킬과 설정을 변경한다. Codex backend는 선택 모델을 기본 상속하지만, 제공 Probe의 CLI 인증까지 이어진다고 확인한 것은 아니다. MCP 시작 시 PyPI 업데이트 알림 조회도 있어 완전한 무통신 도구로 보지 않는다. 실행 후 새 개인 호스트 세션에서 [RUNBOOK 9번](RUNBOOK.md#9-개인-사전-연습에서-ooo와-omo-사용)의 채팅 입력을 사용한다. 패키지에 `ooo` CLI 별칭도 있지만, 이 문서의 `ooo interview` 같은 채팅 요청문을 그대로 셸에 넣지 않는다. uv가 없거나 설치·연결이 막히면 이 예시를 계속 진행하지 않는다. [공식 설치 옵션](https://github.com/Q00/ouroboros/blob/main/README.md), [Codex 연동과 확인 명령](https://github.com/Q00/ouroboros/blob/main/docs/runtime-guides/codex.md)

### omo · Oh My OpenAgent: 기존 Codex CLI의 Light 예

기존 Codex CLI와 Node/npm의 `npx`가 필요하고 Windows에서는 Git Bash도 필요하다. Light는 기존 Codex 인증을 사용한다. 아래 명령은 **이번 설치에서 추가 자율 실행 권한 설정을 선택하지 않는 옵션**이며, 플러그인·설정·훅·MCP·에이전트 파일까지 변경하지 않는다는 뜻은 아니다. 현재 배포 설정에는 Astra 모델·원격 MCP·기본 통계 전송이 있고, 자체 자동 갱신의 기본 명령에는 `--codex-autonomous`가 있다. **이 옵션 하나로 이후 권한·모델·외부 통신이나 응시 규정 충족까지 보장하지 않는다.**

```sh
npx lazycodex-ai install --no-codex-autonomous
```

설치·설정이 끝난 뒤 새 Codex 세션의 채팅에서 [RUNBOOK 9번](RUNBOOK.md#9-개인-사전-연습에서-ooo와-omo-사용)을 사용한다. 원격 MCP·패키지 수신까지 오프라인에서 동작한다고 가정하지 않는다. OpenCode용 Ultimate와 독립형 Native는 설치 경로가 다르므로 이 명령을 그대로 적용하지 않는다. 다른 판을 선택한다면 [공식 플러그인 안내](https://github.com/code-yeongyu/oh-my-openagent/blob/dev/docs/guide/installation.md) 또는 [Native 안내](https://github.com/code-yeongyu/oh-my-openagent/blob/dev/docs/guide/install.md)를 확인한다.

이 절의 개인 환경용 설치를 제공 Probe에 적용하라는 의미는 아니다. 제공 모델·도구로 충분하다면 기존 작업을 그대로 진행한다. 설치 실패를 우회하거나 별도 AI·인증 수단을 시험 환경에 추가하는 절차는 제공하지 않는다.

## 7. 검증 범위와 출처

- Windows 제작 환경의 Node 22.16.0, Python 3.12.14/3.13.3으로 기본 명령과 로컬 파일 예시를 확인했다. pandas 3.0.1, pypdf 6.10.0, pdfplumber 0.11.9의 작은 가상 입력을 사용했다. 최신 버전 표기가 아니다.
- 가상환경 생성·pip 실행 확인과 실제 패키지 설치를 구분한다. 새 패키지를 설치하지 않았고 설치 명령은 공식 문서와 대조했다. Linux/macOS 셸·DuckDB·실제 Probe 실행은 미검증이다.
- ooo·omo의 설치·설정·채팅 입력은 공식 문서와 대조한 예시다. 이번 추가에서 설치·로그인·설정 변경·모델 작업 실행을 하지 않았다.
- [Python venv](https://docs.python.org/3/library/venv.html), [pip 사용법](https://pip.pypa.io/en/stable/user_guide/), [CSV](https://docs.python.org/3/library/csv.html), [JSON](https://docs.python.org/3/library/json.html), [Node 종료 API](https://nodejs.org/api/http.html#servercloseidleconnections). 라이브러리별 근거는 [레포 모음](REPOSITORIES.md)에 연결했다.

실제 질문·프롬프트·데이터·결과는 과제 공간에만 둔다. 이 명령 모음에 커밋·push·외부 전송 절차를 추가하지 않는다.
