#!/usr/bin/env sh
set -e

host="$1"
port="$2"
shift 2

echo "⏳ Waiting for Postgres at $host:$port..."

until nc -z "$host" "$port"; do
  echo "Postgres is unavailable - sleeping 1s"
  sleep 1
done

echo "✅ Postgres is ready!"
exec "$@"
