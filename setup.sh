#!/bin/bash

# Hextra + Tailwind CSS Starter Kit Setup Script
# ================================================
# このスクリプトは新しいプロジェクトのセットアップを自動化します

set -e  # エラーが発生したら即座に終了

# 色の定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ロゴとバナー
echo -e "${BLUE}"
cat << "EOF"
╔═══════════════════════════════════════════════╗
║  Hextra + Tailwind CSS Starter Kit Setup     ║
║  Hugo + Hextra v0.10.2 + Tailwind CSS v4     ║
╚═══════════════════════════════════════════════╝
EOF
echo -e "${NC}"

# プロジェクト名を取得
if [ -z "$1" ]; then
    echo -e "${YELLOW}プロジェクト名を入力してください:${NC}"
    read -p "> " PROJECT_NAME
else
    PROJECT_NAME=$1
fi

# プロジェクト名のバリデーション
if [ -z "$PROJECT_NAME" ]; then
    echo -e "${RED}エラー: プロジェクト名が指定されていません${NC}"
    exit 1
fi

echo -e "${BLUE}プロジェクト名: ${PROJECT_NAME}${NC}"
echo ""

# 必須コマンドのチェック
echo -e "${BLUE}[1/6] 必須コマンドを確認中...${NC}"
REQUIRED_COMMANDS=("git" "hugo" "node" "npm")
MISSING_COMMANDS=()

for cmd in "${REQUIRED_COMMANDS[@]}"; do
    if ! command -v $cmd &> /dev/null; then
        MISSING_COMMANDS+=($cmd)
        echo -e "${RED}  ✗ $cmd が見つかりません${NC}"
    else
        VERSION=$($cmd --version 2>&1 | head -n 1)
        echo -e "${GREEN}  ✓ $cmd: $VERSION${NC}"
    fi
done

if [ ${#MISSING_COMMANDS[@]} -ne 0 ]; then
    echo -e "${RED}エラー: 以下のコマンドをインストールしてください: ${MISSING_COMMANDS[*]}${NC}"
    exit 1
fi
echo ""

# リモートリポジトリの削除
echo -e "${BLUE}[2/6] リモートリポジトリを削除中...${NC}"
if git remote | grep -q "origin"; then
    git remote remove origin
    echo -e "${GREEN}  ✓ リモートリポジトリを削除しました${NC}"
else
    echo -e "${YELLOW}  ⚠ リモートリポジトリが見つかりません (スキップ)${NC}"
fi
echo ""

# Hugoモジュールの初期化
echo -e "${BLUE}[3/6] Hugoモジュールを初期化中...${NC}"
hugo mod init $PROJECT_NAME
echo -e "${GREEN}  ✓ hugo mod init $PROJECT_NAME${NC}"

hugo mod get github.com/imfing/hextra
echo -e "${GREEN}  ✓ hugo mod get github.com/imfing/hextra${NC}"

hugo mod tidy
echo -e "${GREEN}  ✓ hugo mod tidy${NC}"
echo ""

# Node.js依存関係のインストール
echo -e "${BLUE}[4/6] Node.js依存関係をインストール中...${NC}"
npm install
echo -e "${GREEN}  ✓ npm install 完了${NC}"
echo ""

# .env.localファイルの作成
echo -e "${BLUE}[5/6] 環境変数ファイルを作成中...${NC}"
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo -e "${GREEN}  ✓ .env.local を作成しました${NC}"
    echo -e "${YELLOW}  ⚠ Unsplash APIキーを .env.local に設定してください${NC}"
else
    echo -e "${YELLOW}  ⚠ .env.local は既に存在します (スキップ)${NC}"
fi
echo ""

# 起動テスト
echo -e "${BLUE}[6/6] セットアップを検証中...${NC}"
if hugo --quiet; then
    echo -e "${GREEN}  ✓ Hugoビルドが正常に完了しました${NC}"
else
    echo -e "${RED}  ✗ Hugoビルドに失敗しました${NC}"
    exit 1
fi
echo ""

# 完了メッセージ
echo -e "${GREEN}"
cat << "EOF"
╔═══════════════════════════════════════════════╗
║            セットアップ完了！                 ║
╚═══════════════════════════════════════════════╝
EOF
echo -e "${NC}"

echo -e "${BLUE}次のステップ:${NC}"
echo ""
echo -e "1. 開発サーバーを起動:"
echo -e "   ${GREEN}npm run dev${NC}"
echo ""
echo -e "2. ブラウザで確認:"
echo -e "   ${GREEN}http://localhost:1313${NC}"
echo ""
echo -e "3. (オプション) Unsplash APIキーを設定:"
echo -e "   ${GREEN}.env.local${NC} ファイルを編集"
echo ""
echo -e "4. ドキュメントを確認:"
echo -e "   ${GREEN}CLAUDE.md${NC} - Claude Code用の詳細ガイド"
echo -e "   ${GREEN}README.md${NC} - 一般的な使い方"
echo ""
echo -e "${YELLOW}Happy Coding! 🎉${NC}"
