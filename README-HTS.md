# Hextra Tailwind Starter について

このプロジェクトの更新をそのまま利用できません。必要な部分だけを、ご自身で更新、追加していただく必要があります。

このドキュメントは、そのためのガイドや、バージョン番号の確認のためのものです。

## バージョン

- 現在は、v0.4 です（あなたの README-HTS.mdと見比べて下さい）

## 履歴

- v0.4 Hextra v0.10 で、Tailwind CSS v4 に変更になったため、それに合わせた大幅な変更を行なった
- v0.3 Tailwind CSSのチェッカーのサブエージェントを追加
- v0.2 CLAUDE.md を英語を使って、コンパクトに

## アップデート方法

以下のファイル、フォルダを上書きしてください。ただし、以下のファイルやフォルダを独自にカスタマイズしている場合は、変更点を比較して、必要な箇所だけを修正してください。

- .claude （Claude Code Sub Agent）
- assets/js/search-ime-fix.js
- assets/css/tailwind-enhanced.css
- layouts （カスタマイズ色々）
- project-docs の hextra-から始まるファイル
- CLAUDE.md **重要: Hextraテーマのための記述だけを手動で移行する**
- package.json
- postcss.config.js
- `rm -rf node_modules` と　`rm package-lock.json` と `npm install` する
- `hugo mod clean` して　`hugo mod get -u` する

## Hextra v0.9 から v0.10 へ

- 一通りのファイルをアップしたら、その後は、再コンパイルする
- `npm run build` `npm run build:css`
- Claude Code に v3 から v4 にアップしたことを伝え、修正すべきところを見つけて修正を依頼する
