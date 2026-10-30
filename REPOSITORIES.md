# 활용할 레포 주소 모음

공개 원문 재확인일: **2026-10-30 KST**. 기본은 **Cofa Probe Kit의 로컬 자료와 제공 AI**다. 아래는 필요한 기능을 고르는 참고 목록이며 전부 설치하는 목록이 아니다. 명령은 [COMMANDS.md](COMMANDS.md), AI 요청문은 [RUNBOOK 7번](RUNBOOK.md#7-레포와-명령어-모음-활용)에 연결했다.

## 규정상 허용과 실제 연결을 따로 확인

최신 개인 운영 안내가 이 문서보다 우선한다. 공개 레포·MCP·Plugin을 가져올 수 있다는 허용이 **외부 AI 연결·시험 자료 전송·설정 변경·모든 기능의 사용까지 일괄 허용한다는 뜻은 아니다.** 다음 세 조건을 구분한다.

1. **자료 수신:** 공개 GitHub clone·다운로드, 패키지 저장소·추가 바이너리 수신이 각각 허용되고 실제로 연결되는가? 외부 브라우저 제한만으로 모든 외부망이 차단됐다고 단정하지 않는다.
2. **로컬 실행:** 필요한 Python·Node·패키지·확장이 이미 있으며, 제공 환경에서 해당 명령과 설정 변경을 지원하는가? clone만으로 패키지가 설치되지는 않는다.
3. **실행 중 통신:** 제공 모델 외 AI, 원격 MCP, 검색, 자동 갱신, 통계 전송이 있는가? 시험 문제·파일·결과를 외부로 보내는 기능과 차단 우회는 사용하지 않는다.

이 목록은 실제 Probe의 도메인 허용 목록이나 설치 성공을 확인한 결과가 아니다. 받은 로컬 자료·기존 도구로 먼저 진행하고, 사용한 공개 저장소의 공개 유지 조건 등은 최신 안내를 따른다. 개인 PC의 설치 환경·패키지 파일을 시험에 업로드하는 대안도 전제하지 않는다.

## 먼저 가져올 자료

| 레포 | 사용할 것 | 받은 뒤 조건 |
| --- | --- | --- |
| [zittenyetten/cofa-probe-kit](https://github.com/zittenyetten/cofa-probe-kit) | 시작 안내, 요구·검증 스킬 1개, WORKLOG 빈 양식, 반도체 참고자료 | MD는 로컬 읽기. HTML은 Node 18.2 이상과 허용된 내부 Browser. PDF는 제공 미리보기. 추가 패키지 없음 |

최초 clone은 허용된 GitHub 수신 경로가 필요하다. 이미 받은 자료의 열람에는 외부 조회가 필요 없지만 **제공 AI의 모델 연결까지 오프라인이라는 뜻은 아니다.** 이 저장소에 아래 도구의 코드·패키지·실행 파일은 포함하지 않았다.

## 이미 설치된 라이브러리로 로컬 파일 처리

| 레포 | 외부 연결 없이 가능한 범위 | 필요한 조건·주의점 | 공식 근거 |
| --- | --- | --- | --- |
| [pandas-dev/pandas](https://github.com/pandas-dev/pandas) | 로컬 CSV 필터·집계·결합 | 패키지와 의존성이 설치돼 있어야 함. Excel은 형식별 추가 엔진 필요. URL 입력은 별도 통신 | [설치](https://pandas.pydata.org/docs/getting_started/install.html), [Excel 입력·엔진](https://pandas.pydata.org/docs/reference/api/pandas.read_excel.html) |
| [py-pdf/pypdf](https://github.com/py-pdf/pypdf) | 로컬 PDF 페이지·텍스트 처리 | OCR 기능 없음. AES 암호화·이미지 추출 등은 추가 의존성 확인. 텍스트가 안 나와도 빈 페이지로 판단하지 않음 | [설치](https://pypdf.readthedocs.io/en/stable/user/installation.html), [추출 한계](https://pypdf.readthedocs.io/en/stable/user/extract-text.html) |
| [jsvine/pdfplumber](https://github.com/jsvine/pdfplumber) | 로컬 PDF 텍스트·표·좌표 추출 | pdfminer.six·Pillow·pypdfium2 등 의존성 필요. OCR을 대신하지 않으며 추출 표는 원문과 대조 | [README·의존성](https://github.com/jsvine/pdfplumber/tree/4c64b92d5caccd71c645e98e0fabb0c4dba7ff45) |
| [duckdb/duckdb](https://github.com/duckdb/duckdb) | 설치된 기능으로 로컬 CSV·Parquet SQL 처리 | HTTPS·S3 입력은 외부망 필요. HTTPS 읽기만으로 httpfs 확장이 자동 설치될 수 있음. 필요한 확장이 이미 있는지 확인 | [Python 사용법](https://duckdb.org/docs/2.0/clients/python/overview), [확장 동작](https://duckdb.org/docs/2.0/extensions/overview) |

**설치된 것부터 확인하고 필요한 하나만 선택**한다. 작은 CSV는 Python 표준 csv로도 처리할 수 있다. 새 설치는 보통 패키지·의존성 수신이 필요하다. 승인된 로컬 패키지와 모든 의존성이 갖춰진 경우에는 오프라인 설치도 가능하지만, 그런 파일이 제공된다고 가정하지 않는다. 제공 Python·Codex를 임의 업데이트하지 않는다.

DuckDB의 자동 확장 설치·로드 제어와 네트워크 차단은 다르다. `enable_external_access=false`는 **로컬 파일 읽기도 제한**하므로 인터넷만 끄는 옵션처럼 적용하지 않는다. [외부 접근·확장 설정](https://duckdb.org/docs/2.0/operations_manual/securing_duckdb/overview)

## 설치보다 문서 참고가 적절한 것

| 레포 | 참고할 부분 | 전체 도구 사용과의 차이 |
| --- | --- | --- |
| [obra/superpowers](https://github.com/obra/superpowers) | [완료 전 검증](https://github.com/obra/superpowers/blob/2ce8aa15d05bd57213e6f746f953aafb7ded7a8b/skills/verification-before-completion/SKILL.md)의 주장·실행 근거 대조 | 현재 Codex판은 hooks를 포함하지 않지만 전체 흐름에는 하위 에이전트·worktree·Git Push 선택지도 있음. 설치해 모든 절차를 그대로 적용하지 않음 |
| [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) | 목표·발견·진행 기록을 구분하는 방식 | 현재 WORKLOG 하나로 충분. 전체 Codex 플러그인은 Python·shell 기반 lifecycle hooks 7종을 등록하며 문서 읽기와 다름 |

받은 Markdown을 읽는 것만으로 플러그인이 실행·등록되지는 않는다. 현재 스킬과 겹치는 원칙만 참고하고 외부 전송이나 불필요한 설정을 추가하지 않는다. 확인 근거: [superpowers Codex manifest](https://github.com/obra/superpowers/blob/2ce8aa15d05bd57213e6f746f953aafb7ded7a8b/.codex-plugin/plugin.json), [branch 마무리 절차](https://github.com/obra/superpowers/blob/2ce8aa15d05bd57213e6f746f953aafb7ded7a8b/skills/finishing-a-development-branch/SKILL.md), [planning-with-files Codex 안내](https://github.com/OthmanAdi/planning-with-files/blob/5d29800bf8b919ca9a88ee7885b90050b5cb64ed/docs/codex.md), [hooks 정의](https://github.com/OthmanAdi/planning-with-files/blob/5d29800bf8b919ca9a88ee7885b90050b5cb64ed/hooks/codex-hooks.json).

## ooo·omo — 응시 기본 도구에서 제외, 개인 사전 연습용

두 도구의 이름 자체가 일괄 금지됐다고 판단한 것은 아니다. **현재 제공 환경에서의 설치·인증·허용 모델·통신을 확인하지 못했으므로 응시 기본 흐름에 추가하지 않는다.** 요구 정리와 완료 검증 방법은 기존 스킬로도 사용할 수 있다.

| 도구·공식 레포 | 확인한 실행 조건 | 현재 판단 |
| --- | --- | --- |
| **ooo · [Q00/ouroboros](https://github.com/Q00/ouroboros)** | Codex backend는 선택 모델을 기본 상속하나 로컬 codex exec·인증·Python 패키지 필요. setup은 MCP·규칙·스킬·설정 변경 | 별도 AI를 반드시 요구하는 도구는 아님. 제공 Codex의 CLI·인증 연결과 허용된 설치 경로를 검증하기 전에는 도입 보류 |
| **omo Light · [code-yeongyu/oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent)** | 기존 Codex CLI 인증을 사용하지만 현재 모델 catalog·일부 subagent에 gpt-6-astra 명시. 외부 MCP·자체 자동 갱신·기본 통계 전송 포함 | 허용 모델·외부 전송 조건과 충돌할 수 있어 그대로 응시에 사용하도록 권하지 않음. 기존 인증 사용만으로 호환·규정 충족이라 판단하지 않음 |
| **omo Ultimate / Native** | Ultimate는 OpenCode 플러그인, Native는 별도 실행기·provider 인증 경로 | 제공 Codex만 사용하는 현재 기본 경로에서 제외. Native의 오프라인 런타임 설명은 모델 추론까지 오프라인이라는 뜻이 아님 |

### ooo에서 따로 확인한 것

- 이 문서의 `ooo interview` 등은 설정된 호스트의 **AI 채팅 입력**이다. 터미널 예시는 `ouroboros`를 쓴다. 패키지는 `ooo` CLI 별칭도 제공하지만 채팅 요청문을 그대로 셸에 넣지 않는다. Git clone만으로 실행되지 않는다.
- Codex 플러그인의 MCP 실행은 `uvx`와 Python 3.12 이상·패키지에 의존한다. 캐시가 없으면 첫 실행에서도 추가 수신이 필요할 수 있다. [Codex 안내](https://github.com/Q00/ouroboros/blob/722172ef096767583679d04aef5e847458fee6b2/docs/runtime-guides/codex.md), [MCP 실행 정의](https://github.com/Q00/ouroboros/blob/722172ef096767583679d04aef5e847458fee6b2/.mcp.codex.json)
- MCP에는 PyPI 버전 조회를 통한 업데이트 알림도 있다. 실패를 허용하는 조회이며 자동 설치나 Codex 본체 갱신과는 다르다. [알림 구현](https://github.com/Q00/ouroboros/blob/722172ef096767583679d04aef5e847458fee6b2/src/ouroboros/mcp/update_notice.py)

### omo Light에서 따로 확인한 것

- 현재 [모델 catalog](https://github.com/code-yeongyu/oh-my-openagent/blob/bfee6fc72a09c016c47f128fda5aad12c96bbb5c/packages/omo-codex/plugin/model-catalog.json)와 [explorer 설정](https://github.com/code-yeongyu/oh-my-openagent/blob/bfee6fc72a09c016c47f128fda5aad12c96bbb5c/packages/omo-codex/plugin/components/ultrawork/agents/explorer.toml)에 Astra가 지정돼 있다. 최신 운영 안내의 허용 모델과 반드시 대조해야 한다.
- [MCP 정의](https://github.com/code-yeongyu/oh-my-openagent/blob/bfee6fc72a09c016c47f128fda5aad12c96bbb5c/packages/omo-codex/plugin/.mcp.json)에 원격 `grep_app`·`context7`가 포함된다. MCP 허용이 시험 자료를 이 서버들에 보내도 된다는 뜻은 아니다.
- 세션 시작 시 npm 버전 조회·OMO 자체 자동 갱신 경로가 있고, 기본 갱신 명령에는 `--codex-autonomous`가 있다. 최초 설치의 `--no-codex-autonomous`만으로 이후 권한 설정까지 보장하지 않는다. 정상 marketplace 설치에는 갱신 생략 조건이 있다. **Codex 본체 업데이트로 확인한 것은 아니다.** [갱신 명령](https://github.com/code-yeongyu/oh-my-openagent/blob/bfee6fc72a09c016c47f128fda5aad12c96bbb5c/packages/omo-codex/plugin/scripts/auto-update-plan.mjs), [예외·끄기 조건](https://github.com/code-yeongyu/oh-my-openagent/blob/bfee6fc72a09c016c47f128fda5aad12c96bbb5c/packages/omo-codex/plugin/scripts/auto-update.mjs)
- 공식 안내는 기본 익명 통계를 설치·세션 시작 시 외부로 보낸다고 설명한다. 이 사실만으로 시험 내용 유출을 확인한 것은 아니지만, 외부 통신이 없는 도구로 볼 수 없다. [설치·통계 범위와 끄기 옵션](https://github.com/code-yeongyu/oh-my-openagent/blob/bfee6fc72a09c016c47f128fda5aad12c96bbb5c/docs/guide/installation.md#telemetry--privacy)

개인 연습용 설치 예시는 [COMMANDS 6번](COMMANDS.md#6-개인-사전-연습용-ooo와-omo), 설치된 호스트의 채팅 입력은 [RUNBOOK 9번](RUNBOOK.md#9-개인-사전-연습에서-ooo와-omo-사용)에 모았다. 모델 하나나 옵션 하나를 바꾸면 응시 호환성이 해결된다는 안내가 아니다. 개인 환경의 정상 실행도 실제 제공 환경 검증을 대신하지 않는다.

## 검수 범위

이번 재점검에서는 공식 문서·설정·실행 코드의 관련 부분을 읽기 전용으로 확인했다. 라이브러리·두 워크플로의 세부 출처는 별도 검토 담당이 직접 확인해 전달했으며, OMO 모델 catalog·통계 안내는 통합 단계에서도 직접 대조했다. 전체 소스 감사는 아니다. GitHub 소스는 위 고정 커밋, 공식 문서는 확인일 기준이며 이후 버전은 달라질 수 있다.

기존 제작 단계에서 Python 표준 명령·pandas·pypdf·pdfplumber의 작은 파일 읽기를 확인한 이력은 [검증 기록](VALIDATION.md)에 보존했다. 이번에는 이를 재실행하거나 ooo·omo를 설치·설정·실행하지 않았다. DuckDB 실행, 실제 Probe의 패키지·CLI·모델·원격 MCP 연결과 시험에서의 허용 여부는 미검증이다. 개인 공지 원문·응시 링크·비공개 설정과 다른 레포의 실행 파일은 배포하지 않는다.
