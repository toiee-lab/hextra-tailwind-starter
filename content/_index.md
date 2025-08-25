---
title: "Hugo + Hextra + Tailwind CSS Starter"
layout: landing
---

{{< rawhtml >}}
<!-- ヒーローセクション -->
<div class="min-h-screen flex flex-col justify-center py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
  <div class="container mx-auto px-6 max-w-7xl">
    <div class="text-center">
      <!-- バッジ -->
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 mb-8">
        <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span class="text-sm font-medium text-gray-700">Claude Code 最適化済み</span>
      </div>
      
      <!-- メインタイトル -->
      <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        <span class="text-gradient">Hugo + Hextra + Tailwind</span>
        <br />
        <span class="text-4xl md:text-5xl">モダンなドキュメントサイトを構築</span>
      </h1>
      
      <!-- サブタイトル -->
      <p class="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
        美しいドキュメントサイトとブログを素早く構築。<br class="hidden md:block" />
        Claude Codeとの相性抜群、開発効率を最大化するスターターキット
      </p>
      
      <!-- CTAボタン -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/docs" class="btn-primary inline-flex items-center gap-2">
          始める
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </a>
        <a href="https://github.com/toiee-lab/hextra-tailwind-starter" class="btn-secondary inline-flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </div>
</div>

<!-- 特徴セクション -->
<div class="py-20 bg-white">
  <div class="container mx-auto px-6 max-w-7xl">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        なぜこのスターターキットなのか？
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        3つの強力な技術の組み合わせで、開発体験を向上
      </p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
      <!-- カード1 -->
      <div class="card transition-transform hover:scale-105">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">超高速ビルド</h3>
        <p class="text-gray-600">
          Hugoの圧倒的な速度で、数秒でサイトをビルド。大規模なドキュメントでも瞬時に生成
        </p>
      </div>
      
      <!-- カード2 -->
      <div class="card transition-transform hover:scale-105">
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">美しいデザイン</h3>
        <p class="text-gray-600">
          Hextraテーマの洗練されたUI + Tailwind CSSで自由なカスタマイズが可能
        </p>
      </div>
      
      <!-- カード3 -->
      <div class="card transition-transform hover:scale-105">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Claude Code最適化</h3>
        <p class="text-gray-600">
          専用エージェントと権限設定で、Claude Codeとの連携がスムーズ。AI支援開発を最大化
        </p>
      </div>
    </div>
  </div>
</div>

<!-- 技術スタックセクション -->
<div class="py-20 bg-gray-50">
  <div class="container mx-auto px-6 max-w-7xl">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        パワフルな技術スタック
      </h2>
      <p class="text-lg text-gray-600">
        最高の開発体験を提供する技術の組み合わせ
      </p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Hugo -->
      <div class="bg-white rounded-lg p-6 text-center shadow-sm">
        <div class="text-4xl mb-3">⚡</div>
        <h3 class="font-semibold text-gray-900 mb-2">Hugo</h3>
        <p class="text-sm text-gray-600">世界最速の静的サイトジェネレーター</p>
      </div>
      
      <!-- Hextra -->
      <div class="bg-white rounded-lg p-6 text-center shadow-sm">
        <div class="text-4xl mb-3">📚</div>
        <h3 class="font-semibold text-gray-900 mb-2">Hextra</h3>
        <p class="text-sm text-gray-600">美しいドキュメントテーマ</p>
      </div>
      
      <!-- Tailwind CSS -->
      <div class="bg-white rounded-lg p-6 text-center shadow-sm">
        <div class="text-4xl mb-3">🎨</div>
        <h3 class="font-semibold text-gray-900 mb-2">Tailwind CSS</h3>
        <p class="text-sm text-gray-600">ユーティリティファーストCSS</p>
      </div>
      
      <!-- Claude Code -->
      <div class="bg-white rounded-lg p-6 text-center shadow-sm">
        <div class="text-4xl mb-3">🤖</div>
        <h3 class="font-semibold text-gray-900 mb-2">Claude Code</h3>
        <p class="text-sm text-gray-600">AI支援開発環境</p>
      </div>
    </div>
  </div>
</div>

<!-- クイックスタートセクション -->
<div class="py-20 bg-white">
  <div class="container mx-auto px-6 max-w-4xl">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        3ステップで始める
      </h2>
      <p class="text-lg text-gray-600">
        わずか数分でセットアップ完了
      </p>
    </div>
    
    <div class="space-y-8">
      <!-- ステップ1 -->
      <div class="flex gap-6">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            1
          </div>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">リポジトリをクローン</h3>
          <div class="bg-gray-900 text-gray-100 rounded-md p-3 font-mono text-sm">
            git clone https://github.com/yourusername/hextra-tailwind-starter.git
          </div>
        </div>
      </div>
      
      <!-- ステップ2 -->
      <div class="flex gap-6">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            2
          </div>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">依存関係をインストール</h3>
          <div class="bg-gray-900 text-gray-100 rounded-md p-3 font-mono text-sm">
            npm install
          </div>
        </div>
      </div>
      
      <!-- ステップ3 -->
      <div class="flex gap-6">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
            3
          </div>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">開発サーバーを起動</h3>
          <div class="bg-gray-900 text-gray-100 rounded-md p-3 font-mono text-sm">
            hugo server
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 機能一覧セクション -->
<div class="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div class="container mx-auto px-6 max-w-7xl">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        充実の機能
      </h2>
      <p class="text-lg text-gray-600">
        すぐに使える豊富な機能セット
      </p>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 機能リスト -->
      <div class="flex items-start gap-4">
        <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <h3 class="font-semibold text-gray-900">全文検索</h3>
          <p class="text-sm text-gray-600">FlexSearch内蔵、設定不要</p>
        </div>
      </div>
      
      <div class="flex items-start gap-4">
        <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <h3 class="font-semibold text-gray-900">ダークモード</h3>
          <p class="text-sm text-gray-600">自動切り替え対応</p>
        </div>
      </div>
      
      <div class="flex items-start gap-4">
        <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <h3 class="font-semibold text-gray-900">レスポンシブ</h3>
          <p class="text-sm text-gray-600">全デバイス対応</p>
        </div>
      </div>
      
      <div class="flex items-start gap-4">
        <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <h3 class="font-semibold text-gray-900">多言語対応</h3>
          <p class="text-sm text-gray-600">i18nサポート内蔵</p>
        </div>
      </div>
      
      <div class="flex items-start gap-4">
        <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <h3 class="font-semibold text-gray-900">SEO最適化</h3>
          <p class="text-sm text-gray-600">Open Graph・Twitter Cards対応</p>
        </div>
      </div>
      
      <div class="flex items-start gap-4">
        <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <h3 class="font-semibold text-gray-900">シンタックスハイライト</h3>
          <p class="text-sm text-gray-600">多言語コード対応</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- CTAセクション -->
<div class="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
  <div class="container mx-auto px-6 max-w-4xl text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
      今すぐ始めよう
    </h2>
    <p class="text-xl text-blue-100 mb-10">
      美しいドキュメントサイトを、素早く、簡単に
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/docs" class="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold transition-all hover:shadow-lg hover:scale-105">
        ドキュメントを読む
      </a>
      <a href="https://github.com/yourusername/hextra-tailwind-starter" class="bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition-all hover:bg-blue-800">
        GitHubで見る
      </a>
    </div>
  </div>
</div>

<!-- 検索用キーワード（非表示） -->
<span class="hx:sr-only">Hugo Hextra Tailwind CSS スターターキット 静的サイトジェネレーター ドキュメントサイト ブログ Claude Code AI支援開発 FlexSearch レスポンシブデザイン ダークモード 多言語対応 SEO最適化</span>
{{< /rawhtml >}}