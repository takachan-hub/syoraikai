# 翔来会 — Syoraikai Official Landing Page

書道を通じて魂の躍動を表現する「翔来会」の公式ランディングページです。

## 概要

- **サイト名**: 翔来会 / Syoraikai
- **目的**: ブランディング & オリジナルTシャツ通販サイトへの誘導
- **通販サイト**: [syoraikai.original-goods.jp](https://syoraikai.original-goods.jp)

## ファイル構成

```
/
└── index.html    # 全スタイル・スクリプト込みの単一HTMLファイル
```

## 機能・仕様

- **完全レスポンシブ対応** (モバイル / タブレット / PC)
- **スティッキーヘッダー** — スクロール時にガラスモーフィズム効果
- **ヒーローセクション** — 縦書きキャッチコピー、金箔風グラデーション、パーティクルエフェクト
- **スクロールアニメーション** — Intersection Observer による上品なフェードイン
- **パラックス効果** — ヒーロー背景の視差スクロール
- **ギャラリーグリッド** — ホバーで拡大・金色エフェクト
- **CTAボタン** — 光沢ライトスウィープアニメーション
- **モバイルメニュー** — ハンバーガーメニューによるオーバーレイ

## デザイン仕様

| 項目 | 値 |
|------|-----|
| ベースカラー | `#0a0a0a` (墨色) |
| ゴールド | `#D4AF37` + グラデーション |
| 日本語フォント | Noto Serif JP (明朝体) |
| 英語フォント | Playfair Display (セリフ体) |
| アイコン | Font Awesome 6.5 |

## GitHub Pages での公開方法

1. このリポジトリを GitHub にプッシュ
2. **Settings** → **Pages** → **Source: Deploy from a branch**
3. Branch: `main` / Folder: `/ (root)` を選択して **Save**
4. 数分後、`https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます

## SNSリンクの設定方法

`index.html` 内の以下の箇所にそれぞれの実際のURLを入力してください。

```html
<!-- ヘッダー・フッター両方に同様の箇所があります -->
<a href="https://www.youtube.com/@your-channel" aria-label="YouTube">
<a href="https://www.tiktok.com/@your-account" aria-label="TikTok">
<a href="https://www.instagram.com/your-account" aria-label="Instagram">
<a href="https://www.facebook.com/your-page" aria-label="Facebook">
<a href="https://x.com/your-account" aria-label="X">
<a href="https://www.threads.net/@your-account" aria-label="Threads">
```

---

© 2026 Syoraikai. All Rights Reserved.
