#!/bin/bash
set -euo pipefail

usage() {
  printf "\nUsage:\n"
  printf "  ./deployResume.sh\n"
  printf "  ./deployResume.sh -k <pem key file> -h <hostname>\n\n"
  printf "With no arguments, this script just builds the static site.\n"
  printf "Deployment is normally handled by GitHub Pages when you push to main.\n\n"
}

while getopts ":k:h:" flag; do
  case "${flag}" in
    k) key=${OPTARG} ;;
    h) hostname=${OPTARG} ;;
    *) usage; exit 1 ;;
  esac
done

printf "\n----> Building static site\n"
rm -rf dist
npm ci
npm run build

if [[ -z "${key:-}" && -z "${hostname:-}" ]]; then
  printf "\n----> Build complete\n"
  printf "dist/ is ready locally.\n"
  printf "Push to main to deploy via GitHub Pages.\n\n"
  exit 0
fi

if [[ -z "${key:-}" || -z "${hostname:-}" ]]; then
  usage
  exit 1
fi

REMOTE_DIR="/home/ubuntu/resume"

printf "\n----> Deploying static site to %s using %s\n" "$hostname" "$key"

printf "\n----> Preparing remote directory (%s)\n" "$REMOTE_DIR"
ssh -i "$key" ubuntu@"$hostname" <<ENDSSH
set -e
mkdir -p "$REMOTE_DIR"
find "$REMOTE_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
ENDSSH

printf "\n----> Uploading dist/\n"
scp -r -i "$key" dist/* ubuntu@"$hostname":"$REMOTE_DIR"/

printf "\n----> Deployment complete\n"
