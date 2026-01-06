#!/bin/bash
set -euo pipefail

while getopts k:h: flag; do
  case "${flag}" in
    k) key=${OPTARG} ;;
    h) hostname=${OPTARG} ;;
  esac
done

if [[ -z "${key:-}" || -z "${hostname:-}" ]]; then
  printf "\nMissing required parameter.\n"
  printf "  syntax: deployResume.sh -k <pem key file> -h <hostname>\n\n"
  exit 1
fi

REMOTE_DIR="/home/ubuntu/resume"

printf "\n----> Deploying resume to %s using %s\n" "$hostname" "$key"

printf "\n----> Building site\n"
rm -rf dist
npm ci
npm run build

printf "\n----> Preparing remote directory (%s)\n" "$REMOTE_DIR"
ssh -i "$key" ubuntu@"$hostname" <<ENDSSH
set -e
mkdir -p "$REMOTE_DIR"
rm -rf "$REMOTE_DIR"/*
ENDSSH

printf "\n----> Uploading dist/\n"
# Using a trailing slash to copy contents, not the dist folder itself
scp -r -i "$key" dist/* ubuntu@"$hostname":"$REMOTE_DIR"/

printf "\n----> (Optional) Reloading caddy\n"
ssh -i "$key" ubuntu@"$hostname" 'sudo systemctl reload caddy || true'

printf "\n----> Cleaning local artifacts\n"
rm -rf dist

printf "\n----> Deployment complete\n"
