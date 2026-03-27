# Brainstormer 🎨

チームのアイデアを、リアルタイムで整理・共有するためのコラボレーションホワイトボードアプリです。  
`Brainstormer` は、チーム単位のワークスペース管理、キャンバス管理、共同編集を 1 つの UI にまとめ、ブレインストーミングや情報整理をスムーズに行えるように設計されています。

## 概要

このアプリは、認証と組織管理に Clerk、キャンバス一覧などのアプリデータ管理に Convex、描画レイヤーとプレゼンス同期に Liveblocks を採用しています。  
そのため、単なるメモアプリではなく、チームで同時に触れる前提の軽量なビジュアルコラボレーションツールとして構成されています。

## 主な機能

- チーム単位のワークスペース管理
  - Clerk Organizations を利用してチームを作成し、メンバーを招待できます。
- キャンバス管理
  - チームごとにキャンバスを作成、一覧表示、リネーム、削除、共有リンクコピーできます。
- リアルタイム共同編集
  - 参加者アバター、カーソル、選択状態を同期し、複数人で同じキャンバスを同時編集できます。
- 直感的なボード編集
  - テキスト、付箋、四角形、円、フリーハンド描画を追加できます。
- 編集支援機能
  - 範囲選択、移動、リサイズ、色変更、前面/背面移動、コピー&ペースト、Undo/Redo に対応しています。
- チーム整合性を考慮したアクセス制御
  - Liveblocks 認証時に、現在の組織と対象キャンバスの所属チームを照合しています。

## 技術スタック

| レイヤー | 採用技術 |
| --- | --- |
| Frontend | Next.js 15, React 18, TypeScript |
| UI | Tailwind CSS, shadcn/ui, Radix UI, Lucide |
| Authentication / Organization | Clerk |
| App Data | Convex |
| Realtime Collaboration | Liveblocks |
| Monitoring | Vercel Analytics, Vercel Speed Insights |

## アーキテクチャの考え方

`Brainstormer` では、責務を明確に分離しています。

- Convex
  - キャンバスのタイトル、作成者、所属チーム、サムネイルなどのメタデータを保持します。
- Liveblocks
  - レイヤー構造、選択状態、カーソル、ペン入力、共同編集履歴など、リアルタイム性が重要な情報を扱います。
- Clerk
  - サインイン、ユーザー情報、組織管理、メンバー招待を担当します。

## 画面とユーザーフロー

1. サインイン
2. チーム作成または既存チームへ参加
3. ダッシュボードからキャンバスを作成
4. キャンバス上で図形や付箋を追加し、チームメンバーと同時編集
5. 必要に応じてキャンバス名変更、削除、共有リンク取得

## セットアップ

### 1. 依存関係をインストール

```bash
npm install
```

### 2. `.env.local` を作成

以下の環境変数を設定してください。

```bash
CONVEX_DEPLOYMENT=your-convex-deployment
NEXT_PUBLIC_CONVEX_URL=https://your-convex-instance.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
LIVEBLOCKS_SECRET_KEY=sk_...
```

各変数の役割:

| 変数名 | 用途 |
| --- | --- |
| `CONVEX_DEPLOYMENT` | Convex のデプロイメント識別子 |
| `NEXT_PUBLIC_CONVEX_URL` | フロントエンドと API から利用する Convex エンドポイント |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk の公開キー |
| `CLERK_SECRET_KEY` | Clerk のサーバーサイド用シークレット |
| `LIVEBLOCKS_SECRET_KEY` | Liveblocks 認証 API で利用するサーバーシークレット |

### 3. Clerk と Convex の連携設定を確認

Clerk プロジェクトを差し替える場合は、`convex/auth.config.ts` の `domain` を利用中の Clerk 環境に合わせて更新してください。

### 4. Convex 開発サーバーを起動

```bash
npx convex dev
```

### 5. Next.js 開発サーバーを起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開くと確認できます。

## 利用可能なスクリプト

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | Next.js の開発サーバーを起動 |
| `npm run build` | 本番ビルドを生成 |
| `npm run start` | 本番モードでアプリを起動 |
| `npm run lint` | ESLint を実行 |

## ディレクトリ構成

```text
app/
  (dashboard)/            ダッシュボード、チーム切替、キャンバス一覧
  canvas/[canvasId]/      リアルタイム編集キャンバス
  api/liveblocks-auth/    Liveblocks 認証エンドポイント
convex/                   スキーマ、クエリ、ミューテーション
components/               共通 UI、メニュー、モーダル
providers/                Clerk / Convex のプロバイダ定義
store/                    クライアント状態管理
lib/                      ユーティリティ関数
hook/                     キャンバス操作用フック
```

## Brainstormer が向いている用途

- チームでのブレインストーミング
- 付箋ベースのアイデア整理
- 初期フェーズの画面設計や構成メモ
- 軽量なオンラインホワイトボード運用

