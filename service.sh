#!/usr/bin/env bash
# service.sh — manage papyrus360 dev portal on port 4000

set -uo pipefail

APP_NAME="papyrus360"
PORT=4000
PID_FILE=".papyrus360.pid"
LOG_FILE=".papyrus360.log"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BOOT_TIMEOUT=20   # seconds to wait for HTTP after start

# ── colours ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

info()    { echo -e "${CYAN}[papyrus360]${RESET} $*"; }
ok()      { echo -e "${GREEN}[papyrus360]${RESET} $*"; }
warn()    { echo -e "${YELLOW}[papyrus360]${RESET} $*"; }
err()     { echo -e "${RED}[papyrus360]${RESET} $*" >&2; }
die()     { err "$*"; exit 1; }
divider() { echo -e "${CYAN}────────────────────────────────────────${RESET}"; }

# ── helpers ────────────────────────────────────────────────────────────────────
is_running() {
  [[ -f "$PID_FILE" ]] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null
}

port_in_use() {
  ss -tlnp 2>/dev/null | grep -q ":${PORT} " || \
  lsof -ti ":${PORT}" &>/dev/null
}

who_owns_port() {
  # returns "pid:cmd" or empty
  local pid cmd
  pid=$(lsof -ti ":${PORT}" 2>/dev/null | head -1) || true
  [[ -z "$pid" ]] && return
  cmd=$(ps -p "$pid" -o comm= 2>/dev/null) || cmd="unknown"
  echo "${pid}:${cmd}"
}

wait_for_http() {
  local elapsed=0
  info "Waiting for HTTP on port ${PORT}..."
  while (( elapsed < BOOT_TIMEOUT )); do
    if curl -s -o /dev/null -w "%{http_code}" "http://localhost:${PORT}" 2>/dev/null | grep -q "^[23]"; then
      return 0
    fi
    sleep 1
    (( elapsed++ ))
  done
  return 1
}

page_title() {
  curl -s "http://localhost:${PORT}" 2>/dev/null \
    | grep -o '<title>[^<]*</title>' \
    | sed 's/<[^>]*>//g'
}

# ── commands ───────────────────────────────────────────────────────────────────
start() {
  divider
  info "Starting ${BOLD}${APP_NAME}${RESET} on port ${PORT}"

  if is_running; then
    local pid; pid=$(cat "$PID_FILE")
    warn "Already running — PID ${pid}"
    info "URL: http://localhost:${PORT}"
    exit 0
  fi

  # check port conflict from another process
  if port_in_use; then
    local owner; owner=$(who_owns_port)
    local opid="${owner%%:*}"
    local ocmd="${owner##*:}"
    err "Port ${PORT} in use by '${ocmd}' (PID ${opid})."
    err "Kill it with:  kill ${opid}"
    err "Or change PORT= in this script."
    exit 1
  fi

  cd "$DIR"
  PORT=$PORT nohup npm run dev > "$LOG_FILE" 2>&1 &
  local pid=$!
  echo "$pid" > "$PID_FILE"
  info "Process started (PID ${pid})"

  if wait_for_http; then
    local title; title=$(page_title)
    ok "Server ready ✓"
    divider
    echo -e "  ${BOLD}URL:${RESET}   http://localhost:${PORT}"
    echo -e "  ${BOLD}PID:${RESET}   ${pid}"
    echo -e "  ${BOLD}Title:${RESET} ${title}"
    echo -e "  ${BOLD}Logs:${RESET}  ${LOG_FILE}"
    divider
  else
    err "Server did not respond within ${BOOT_TIMEOUT}s."
    err "Check logs: tail -f ${LOG_FILE}"
    # show last few log lines for quick diagnosis
    echo ""
    warn "Last log lines:"
    tail -10 "$LOG_FILE" >&2
    exit 1
  fi
}

stop() {
  divider
  if ! is_running; then
    warn "Not running (no PID file or process gone)."
    rm -f "$PID_FILE"
    exit 0
  fi

  local pid; pid=$(cat "$PID_FILE")
  info "Stopping ${APP_NAME} (PID ${pid})..."
  if kill "$pid" 2>/dev/null; then
    # wait up to 5s for process to die
    local i=0
    while kill -0 "$pid" 2>/dev/null && (( i < 5 )); do
      sleep 1; (( i++ ))
    done
    if kill -0 "$pid" 2>/dev/null; then
      warn "Process still alive — sending SIGKILL"
      kill -9 "$pid" 2>/dev/null || true
    fi
    rm -f "$PID_FILE"
    ok "Stopped."
  else
    err "Failed to kill PID ${pid}. Process may already be gone."
    rm -f "$PID_FILE"
    exit 1
  fi
  divider
}

status() {
  divider
  if is_running; then
    local pid; pid=$(cat "$PID_FILE")
    local title="(server not yet ready)"
    if port_in_use; then
      title=$(page_title 2>/dev/null || echo "(could not fetch)")
    fi
    ok "${BOLD}RUNNING${RESET}"
    echo -e "  ${BOLD}PID:${RESET}   ${pid}"
    echo -e "  ${BOLD}Port:${RESET}  ${PORT}"
    echo -e "  ${BOLD}URL:${RESET}   http://localhost:${PORT}"
    echo -e "  ${BOLD}Title:${RESET} ${title}"
    echo -e "  ${BOLD}Logs:${RESET}  ${LOG_FILE}"
  else
    warn "STOPPED"
    rm -f "$PID_FILE"

    # warn if something else grabbed the port
    if port_in_use; then
      local owner; owner=$(who_owns_port)
      warn "Port ${PORT} in use by PID ${owner%%:*} (${owner##*:}) — not this app."
    fi
  fi
  divider
}

restart() {
  info "Restarting ${APP_NAME}..."
  stop
  sleep 1
  start
}

logs() {
  if [[ -f "$LOG_FILE" ]]; then
    info "Tailing ${LOG_FILE} (Ctrl+C to exit)"
    tail -f "$LOG_FILE"
  else
    die "No log file found — start service first."
  fi
}

usage() {
  divider
  echo -e "  ${BOLD}service.sh${RESET} — ${APP_NAME} process manager"
  echo ""
  echo -e "  ${CYAN}./service.sh start${RESET}    Start on port ${PORT}"
  echo -e "  ${CYAN}./service.sh stop${RESET}     Stop process"
  echo -e "  ${CYAN}./service.sh restart${RESET}  Stop then start"
  echo -e "  ${CYAN}./service.sh status${RESET}   Show PID, URL, page title"
  echo -e "  ${CYAN}./service.sh logs${RESET}     Tail log output"
  divider
  exit 1
}

# ── dispatch ───────────────────────────────────────────────────────────────────
case "${1:-}" in
  start)   start   ;;
  stop)    stop    ;;
  status)  status  ;;
  restart) restart ;;
  logs)    logs    ;;
  *)       usage   ;;
esac
