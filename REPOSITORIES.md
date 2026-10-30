# 활용할 레포 주소 모음

공개 원문 확인일: **2026-10-30 KST**. 기본은 **이 Workkit과 제공 AI**다. 아래는 필요할 때 찾아볼 주소 모음이며 전부 설치하는 목록이 아니다. 명령은 [COMMANDS.md](COMMANDS.md), AI에게 맡길 때는 [RUNBOOK 7번](RUNBOOK.md#7-레포와-명령어-모음-활용)을 본다.

## 먼저 가져올 자료

| 레포 | 사용할 것 | 받은 뒤 조건 |
| --- | --- | --- |
| [zittenyetten/cofa-probe-kit](https://github.com/zittenyetten/cofa-probe-kit) | 시작 안내, 요구·검증 스킬 1개, WORKLOG 빈 양식, 반도체 참고자료 | MD는 로컬 읽기. HTML은 Node 18.2 이상과 허용된 내부 Browser. PDF는 제공 미리보기. 추가 패키지 없음 |

최초 clone은 저장소 접근이 필요하다. 검색 불가와 GitHub 수신 허용은 별개이며, 이 저장소에 다른 레포의 코드·라이브러리·실행 파일까지 들어 있는 것은 아니다.

## 특정 파일 작업이 있을 때만

| 레포 | 쓸 만한 상황 | 먼저 확인할 점 | 공식 근거 |
| --- | --- | --- | --- |
| [pandas-dev/pandas](https://github.com/pandas-dev/pandas) | CSV 필터·집계·결합처럼 표 작업이 많을 때 | 작은 CSV 확인은 Python 표준 csv로도 가능. 기본 설치만으로 모든 Excel 엔진이 준비되는 것은 아님 | [설치](https://pandas.pydata.org/docs/getting_started/install.html) |
| [py-pdf/pypdf](https://github.com/py-pdf/pypdf) | PDF 페이지 수·텍스트 확인, 필요 시 분할·병합 | OCR 도구가 아님. 텍스트가 안 나와도 빈 페이지라고 판단하지 않음 | [설치](https://pypdf.readthedocs.io/en/stable/user/installation.html), [추출 한계](https://pypdf.readthedocs.io/en/stable/user/extract-text.html) |
| [jsvine/pdfplumber](https://github.com/jsvine/pdfplumber) | PDF의 텍스트·표·좌표를 자세히 볼 때 | 추출된 표의 행·열·누락은 원래 페이지와 대조. 이미지 문서의 OCR을 대신하지 않음 | [README·사용법](https://github.com/jsvine/pdfplumber/blob/stable/README.md) |
| [duckdb/duckdb](https://github.com/duckdb/duckdb) | SQL로 로컬 CSV·Parquet 집계·결합 | SQL이 익숙하거나 데이터 크기 때문에 필요할 때 선택. 원격 URL·외부 확장은 다운로드를 유발할 수 있음 | [Python 사용법](https://duckdb.org/docs/2.0/clients/python/overview), [확장 동작](https://duckdb.org/docs/2.0/extensions/overview) |

**설치된 것부터 확인하고 필요한 하나만 선택**한다. clone은 소스를 받는 동작이며 라이브러리 설치를 대신하지 않는다. 사용을 위해 큰 소스 레포를 통째로 clone할 필요도 없다. 설치는 패키지·의존성 수신이 필요하므로 검색이 안 되는 응시 환경에서 성공할 것이라고 가정하지 않는다.

Python 지원 범위는 배포 버전과 개발 브랜치가 다를 수 있다. 명령 모음의 실제 검사 버전과 최신 upstream을 구분하고 제공 Python을 임의 업데이트하지 않는다. 설치가 불가능하면 기존 표준 기능·제공 미리보기로 진행한다.

## 설치보다 읽기 참고가 적절한 것

| 레포 | 참고할 부분 | 이 묶음에서의 판단 |
| --- | --- | --- |
| [obra/superpowers](https://github.com/obra/superpowers) | [완료 전 검증](https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md)의 주장·실행 근거 대조 | 기존 스킬과 겹친다. 전체 개발 흐름·플러그인을 추가하지 않고 필요한 문서만 시험 전에 참고 |
| [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) | [README](https://github.com/OthmanAdi/planning-with-files/blob/master/README.md)의 목표·발견·진행 기록 구분 | 현재 WORKLOG 하나로 충분하다. 추가 기록 파일·훅·복구 절차 설치는 기본 준비에서 제외 |

문서를 읽는다고 자동 실행·등록되는 것은 아니다. 전체 하네스·MCP·별도 AI 연결·외부 검색 도구 설치를 이 목록이 요구하거나 허가하지 않는다. 본문을 통째로 재배포하지 않고 링크와 짧은 활용 판단만 실었다.

## ooo·omo — 개인 사전 연습용 워크플로 도구

요구사항 정리나 여러 단계의 개발을 연습할 때 참고할 선택지다. **현재 Workkit의 기본 구성은 제공 AI와 기존 스킬 하나로 유지한다.** 아래 도구의 설치·호스트 설정을 시험 준비의 필수 단계로 추가하지 않는다. 일반 데이터 집계·파일 확인에는 실행 절차가 더 늘어날 수 있으므로 과제 규모에 맞춰 선택한다.

| 도구·공식 레포 | 역할·활용할 부분 | 이 준비에서의 판단 |
| --- | --- | --- |
| **ooo · [Q00/ouroboros](https://github.com/Q00/ouroboros)** | 인터뷰 → Seed(목표·제약·완료 기준) → 실행 → 평가를 연결하는 워크플로. Codex CLI·Claude Code·OpenCode 등의 호스트와 연결 | 요구를 명확히 묻고 완료 기준으로 결과를 대조하는 방식을 개인 프로젝트에서 연습할 때 적합. 실행 루프·MCP·추가 기록이 현재 스킬과 겹치므로 제공 환경에 자동 추가하지 않음 |
| **omo · [code-yeongyu/oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent)** | 옛 이름 **Oh My OpenCode**. 여러 역할·도구·훅을 연결하는 개발 에이전트 도구. 현재는 OpenCode용 Ultimate, Codex CLI용 Light, 독립형 Native로 구분 | 여러 파일을 개발·검증하는 개인 프로젝트에서 비교할 선택지. 단순히 MD를 읽는 스킬과 달리 호스트 설정·실행 구성이 필요하며 외부 검색 없는 환경의 기본 도구로 가정하지 않음 |

OOO의 `ooo interview` 같은 문구는 설정된 호스트의 **AI 채팅 입력**이다. 터미널 CLI는 `ouroboros`이며, 저장소 clone만으로 두 방식이 실행되지는 않는다. [공식 시작 안내](https://github.com/Q00/ouroboros/blob/main/docs/getting-started.md), [Codex 연동 안내](https://github.com/Q00/ouroboros/blob/main/docs/runtime-guides/codex.md)

OMO의 Light는 기존 Codex CLI 인증을 사용하지만, 설치 시 플러그인·설정·훅·MCP 등을 변경한다. 패키지 수신과 원격 MCP 기능은 외부 연결에 의존한다. Native의 설치 패키지는 `omo-ai`이고 npm의 `omo`는 다른 패키지다. [공식 플러그인 설치 안내](https://github.com/code-yeongyu/oh-my-openagent/blob/dev/docs/guide/installation.md), [Native 안내](https://github.com/code-yeongyu/oh-my-openagent/blob/dev/docs/guide/install.md)

**외부망 없는 상황에서는 받은 문서의 방법을 참고하는 것과 도구 전체를 실행하는 것을 구분한다.** 로컬 문서는 읽을 수 있어도 설치·모델 연결·검색 기능까지 가능하다는 뜻은 아니다. 제공 Probe의 설치 허가·지원 호스트·호환성은 확인하지 않았다. 개인 연습용 설치 예시는 [COMMANDS 6번](COMMANDS.md#6-개인-사전-연습용-ooo와-omo), 설치된 호스트의 채팅 입력 예시는 [RUNBOOK 9번](RUNBOOK.md#9-개인-사전-연습에서-ooo와-omo-사용)에 모았다.

## 검수 범위

공식 원문을 확인해 용도·설치와 실행의 차이를 정리했다. 제작 환경에서 Python 표준 명령·pandas·pypdf·pdfplumber의 작은 파일 읽기를 확인했다. DuckDB는 공식 문서 대조만 했고 실행하지 않았다. 실제 과제에 필요한지, 제공 환경에 있는지, 반입·설치가 허용되는지는 별개다. 점수·시간 절약·Probe 호환성을 보장하는 추천이 아니다.

ooo는 공식 README·시작 안내·Codex 연동 문서의 관련 본문을 직접 확인했다. omo는 공식 설치 안내를 직접 읽고 별도 출처 검토가 읽은 README·Native 안내의 요약을 반영했다. 이번 추가에서 두 도구를 설치하거나 작업을 실행하지 않았다. 레포의 전체 본문·스킬·실행 파일을 이 묶음에 복사하지 않았다.
