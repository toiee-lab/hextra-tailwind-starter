---
title: "Hugo + Hextra + Tailwind CSS Starter"
layout: landing
---

{{< rawhtml >}}
<!-- ヒーローセクション -->
<div class="tl-min-h-screen tl-flex tl-flex-col tl-justify-center tl-py-20 tl-bg-gradient-to-br tl-from-blue-50 tl-via-white tl-to-purple-50">
  <div class="tl-container tl-mx-auto tl-px-6 tl-max-w-7xl">
    <div class="tl-text-center">
      <!-- バッジ -->
      <div class="tl-inline-flex tl-items-center tl-gap-2 tl-px-4 tl-py-2 tl-bg-white tl-rounded-full tl-shadow-sm tl-border tl-border-gray-200 tl-mb-8">
        <span class="tl-w-2 tl-h-2 tl-bg-green-500 tl-rounded-full tl-animate-pulse"></span>
        <span class="tl-text-sm tl-font-medium tl-text-gray-700">Claude Code 最適化済み</span>
      </div>
      
      <!-- メインタイトル -->
      <h1 class="tl-text-5xl md:tl-text-6xl tl-font-bold tl-text-gray-900 tl-mb-6">
        <span class="tl-text-gradient">Hugo + Hextra + Tailwind</span>
        <br />
        <span class="tl-text-4xl md:tl-text-5xl">モダンなドキュメントサイトを構築</span>
      </h1>
      
      <!-- サブタイトル -->
      <p class="tl-text-xl tl-text-gray-600 tl-mb-10 tl-max-w-3xl tl-mx-auto">
        美しいドキュメントサイトとブログを素早く構築。<br class="tl-hidden md:tl-block" />
        Claude Codeとの相性抜群、開発効率を最大化するスターターキット
      </p>
      
      <!-- CTAボタン -->
      <div class="tl-flex tl-flex-col sm:tl-flex-row tl-gap-4 tl-justify-center">
        <a href="/docs" class="tl-btn-primary tl-inline-flex tl-items-center tl-gap-2">
          始める
          <svg class="tl-w-5 tl-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </a>
        <a href="https://github.com/yourusername/hextra-tailwind-starter" class="tl-btn-secondary tl-inline-flex tl-items-center tl-gap-2">
          <svg class="tl-w-5 tl-h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </div>
</div>

<!-- 特徴セクション -->
<div class="tl-py-20 tl-bg-white">
  <div class="tl-container tl-mx-auto tl-px-6 tl-max-w-7xl">
    <div class="tl-text-center tl-mb-16">
      <h2 class="tl-text-3xl md:tl-text-4xl tl-font-bold tl-text-gray-900 tl-mb-4">
        なぜこのスターターキットなのか？
      </h2>
      <p class="tl-text-lg tl-text-gray-600 tl-max-w-2xl tl-mx-auto">
        3つの強力な技術の組み合わせで、開発体験を向上
      </p>
    </div>
    
    <div class="tl-grid md:tl-grid-cols-3 tl-gap-8">
      <!-- カード1 -->
      <div class="tl-card tl-transition-transform hover:tl-scale-105">
        <div class="tl-w-12 tl-h-12 tl-bg-blue-100 tl-rounded-lg tl-flex tl-items-center tl-justify-center tl-mb-4">
          <svg class="tl-w-6 tl-h-6 tl-text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="tl-text-xl tl-font-semibold tl-text-gray-900 tl-mb-2">超高速ビルド</h3>
        <p class="tl-text-gray-600">
          Hugoの圧倒的な速度で、数秒でサイトをビルド。大規模なドキュメントでも瞬時に生成
        </p>
      </div>
      
      <!-- カード2 -->
      <div class="tl-card tl-transition-transform hover:tl-scale-105">
        <div class="tl-w-12 tl-h-12 tl-bg-purple-100 tl-rounded-lg tl-flex tl-items-center tl-justify-center tl-mb-4">
          <svg class="tl-w-6 tl-h-6 tl-text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
          </svg>
        </div>
        <h3 class="tl-text-xl tl-font-semibold tl-text-gray-900 tl-mb-2">美しいデザイン</h3>
        <p class="tl-text-gray-600">
          Hextraテーマの洗練されたUI + Tailwind CSSで自由なカスタマイズが可能
        </p>
      </div>
      
      <!-- カード3 -->
      <div class="tl-card tl-transition-transform hover:tl-scale-105">
        <div class="tl-w-12 tl-h-12 tl-bg-green-100 tl-rounded-lg tl-flex tl-items-center tl-justify-center tl-mb-4">
          <svg class="tl-w-6 tl-h-6 tl-text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 class="tl-text-xl tl-font-semibold tl-text-gray-900 tl-mb-2">Claude Code最適化</h3>
        <p class="tl-text-gray-600">
          専用エージェントと権限設定で、Claude Codeとの連携がスムーズ。AI支援開発を最大化
        </p>
      </div>
    </div>
  </div>
</div>

<!-- 技術スタックセクション -->
<div class="tl-py-20 tl-bg-gray-50">
  <div class="tl-container tl-mx-auto tl-px-6 tl-max-w-7xl">
    <div class="tl-text-center tl-mb-16">
      <h2 class="tl-text-3xl md:tl-text-4xl tl-font-bold tl-text-gray-900 tl-mb-4">
        パワフルな技術スタック
      </h2>
      <p class="tl-text-lg tl-text-gray-600">
        最高の開発体験を提供する技術の組み合わせ
      </p>
    </div>
    
    <div class="tl-grid md:tl-grid-cols-2 lg:tl-grid-cols-4 tl-gap-6">
      <!-- Hugo -->
      <div class="tl-bg-white tl-rounded-lg tl-p-6 tl-text-center tl-shadow-sm">
        <div class="tl-text-4xl tl-mb-3">⚡</div>
        <h3 class="tl-font-semibold tl-text-gray-900 tl-mb-2">Hugo</h3>
        <p class="tl-text-sm tl-text-gray-600">世界最速の静的サイトジェネレーター</p>
      </div>
      
      <!-- Hextra -->
      <div class="tl-bg-white tl-rounded-lg tl-p-6 tl-text-center tl-shadow-sm">
        <div class="tl-text-4xl tl-mb-3">📚</div>
        <h3 class="tl-font-semibold tl-text-gray-900 tl-mb-2">Hextra</h3>
        <p class="tl-text-sm tl-text-gray-600">美しいドキュメントテーマ</p>
      </div>
      
      <!-- Tailwind CSS -->
      <div class="tl-bg-white tl-rounded-lg tl-p-6 tl-text-center tl-shadow-sm">
        <div class="tl-text-4xl tl-mb-3">🎨</div>
        <h3 class="tl-font-semibold tl-text-gray-900 tl-mb-2">Tailwind CSS</h3>
        <p class="tl-text-sm tl-text-gray-600">ユーティリティファーストCSS</p>
      </div>
      
      <!-- Claude Code -->
      <div class="tl-bg-white tl-rounded-lg tl-p-6 tl-text-center tl-shadow-sm">
        <div class="tl-text-4xl tl-mb-3">🤖</div>
        <h3 class="tl-font-semibold tl-text-gray-900 tl-mb-2">Claude Code</h3>
        <p class="tl-text-sm tl-text-gray-600">AI支援開発環境</p>
      </div>
    </div>
  </div>
</div>

<!-- クイックスタートセクション -->
<div class="tl-py-20 tl-bg-white">
  <div class="tl-container tl-mx-auto tl-px-6 tl-max-w-4xl">
    <div class="tl-text-center tl-mb-12">
      <h2 class="tl-text-3xl md:tl-text-4xl tl-font-bold tl-text-gray-900 tl-mb-4">
        3ステップで始める
      </h2>
      <p class="tl-text-lg tl-text-gray-600">
        わずか数分でセットアップ完了
      </p>
    </div>
    
    <div class="tl-space-y-8">
      <!-- ステップ1 -->
      <div class="tl-flex tl-gap-6">
        <div class="tl-flex-shrink-0">
          <div class="tl-w-10 tl-h-10 tl-bg-blue-600 tl-text-white tl-rounded-full tl-flex tl-items-center tl-justify-center tl-font-bold">
            1
          </div>
        </div>
        <div class="tl-flex-1">
          <h3 class="tl-text-lg tl-font-semibold tl-text-gray-900 tl-mb-2">リポジトリをクローン</h3>
          <div class="tl-bg-gray-900 tl-text-gray-100 tl-rounded-md tl-p-3 tl-font-mono tl-text-sm">
            git clone https://github.com/yourusername/hextra-tailwind-starter.git
          </div>
        </div>
      </div>
      
      <!-- ステップ2 -->
      <div class="tl-flex tl-gap-6">
        <div class="tl-flex-shrink-0">
          <div class="tl-w-10 tl-h-10 tl-bg-blue-600 tl-text-white tl-rounded-full tl-flex tl-items-center tl-justify-center tl-font-bold">
            2
          </div>
        </div>
        <div class="tl-flex-1">
          <h3 class="tl-text-lg tl-font-semibold tl-text-gray-900 tl-mb-2">依存関係をインストール</h3>
          <div class="tl-bg-gray-900 tl-text-gray-100 tl-rounded-md tl-p-3 tl-font-mono tl-text-sm">
            npm install
          </div>
        </div>
      </div>
      
      <!-- ステップ3 -->
      <div class="tl-flex tl-gap-6">
        <div class="tl-flex-shrink-0">
          <div class="tl-w-10 tl-h-10 tl-bg-blue-600 tl-text-white tl-rounded-full tl-flex tl-items-center tl-justify-center tl-font-bold">
            3
          </div>
        </div>
        <div class="tl-flex-1">
          <h3 class="tl-text-lg tl-font-semibold tl-text-gray-900 tl-mb-2">開発サーバーを起動</h3>
          <div class="tl-bg-gray-900 tl-text-gray-100 tl-rounded-md tl-p-3 tl-font-mono tl-text-sm">
            hugo server
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 機能一覧セクション -->
<div class="tl-py-20 tl-bg-gradient-to-b tl-from-gray-50 tl-to-white">
  <div class="tl-container tl-mx-auto tl-px-6 tl-max-w-7xl">
    <div class="tl-text-center tl-mb-16">
      <h2 class="tl-text-3xl md:tl-text-4xl tl-font-bold tl-text-gray-900 tl-mb-4">
        充実の機能
      </h2>
      <p class="tl-text-lg tl-text-gray-600">
        すぐに使える豊富な機能セット
      </p>
    </div>
    
    <div class="tl-grid md:tl-grid-cols-2 lg:tl-grid-cols-3 tl-gap-6">
      <!-- 機能リスト -->
      <div class="tl-flex tl-items-start tl-gap-4">
        <svg class="tl-w-6 tl-h-6 tl-text-green-500 tl-flex-shrink-0 tl-mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <h3 class="tl-font-semibold tl-text-gray-900">全文検索</h3>
          <p class="tl-text-sm tl-text-gray-600">FlexSearch内蔵、設定不要</p>
        </div>
      </div>
      
      <div class="tl-flex tl-items-start tl-gap-4">
        <svg class="tl-w-6 tl-h-6 tl-text-green-500 tl-flex-shrink-0 tl-mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <h3 class="tl-font-semibold tl-text-gray-900">ダークモード</h3>
          <p class="tl-text-sm tl-text-gray-600">自動切り替え対応</p>
        </div>
      </div>
      
      <div class="tl-flex tl-items-start tl-gap-4">
        <svg class="tl-w-6 tl-h-6 tl-text-green-500 tl-flex-shrink-0 tl-mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <h3 class="tl-font-semibold tl-text-gray-900">レスポンシブ</h3>
          <p class="tl-text-sm tl-text-gray-600">全デバイス対応</p>
        </div>
      </div>
      
      <div class="tl-flex tl-items-start tl-gap-4">
        <svg class="tl-w-6 tl-h-6 tl-text-green-500 tl-flex-shrink-0 tl-mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <h3 class="tl-font-semibold tl-text-gray-900">多言語対応</h3>
          <p class="tl-text-sm tl-text-gray-600">i18nサポート内蔵</p>
        </div>
      </div>
      
      <div class="tl-flex tl-items-start tl-gap-4">
        <svg class="tl-w-6 tl-h-6 tl-text-green-500 tl-flex-shrink-0 tl-mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <h3 class="tl-font-semibold tl-text-gray-900">SEO最適化</h3>
          <p class="tl-text-sm tl-text-gray-600">Open Graph・Twitter Cards対応</p>
        </div>
      </div>
      
      <div class="tl-flex tl-items-start tl-gap-4">
        <svg class="tl-w-6 tl-h-6 tl-text-green-500 tl-flex-shrink-0 tl-mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <h3 class="tl-font-semibold tl-text-gray-900">シンタックスハイライト</h3>
          <p class="tl-text-sm tl-text-gray-600">多言語コード対応</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- CTAセクション -->
<div class="tl-py-20 tl-bg-gradient-to-r tl-from-blue-600 tl-to-purple-600">
  <div class="tl-container tl-mx-auto tl-px-6 tl-max-w-4xl tl-text-center">
    <h2 class="tl-text-3xl md:tl-text-4xl tl-font-bold tl-text-white tl-mb-6">
      今すぐ始めよう
    </h2>
    <p class="tl-text-xl tl-text-blue-100 tl-mb-10">
      美しいドキュメントサイトを、素早く、簡単に
    </p>
    <div class="tl-flex tl-flex-col sm:tl-flex-row tl-gap-4 tl-justify-center">
      <a href="/docs" class="tl-bg-white tl-text-blue-600 tl-px-8 tl-py-3 tl-rounded-md tl-font-semibold tl-transition-all hover:tl-shadow-lg hover:tl-scale-105">
        ドキュメントを読む
      </a>
      <a href="https://github.com/yourusername/hextra-tailwind-starter" class="tl-bg-blue-700 tl-text-white tl-px-8 tl-py-3 tl-rounded-md tl-font-semibold tl-transition-all hover:tl-bg-blue-800">
        GitHubで見る
      </a>
    </div>
  </div>
</div>

<!-- 検索用キーワード（非表示） -->
<span class="hx-sr-only">Hugo Hextra Tailwind CSS スターターキット 静的サイトジェネレーター ドキュメントサイト ブログ Claude Code AI支援開発 FlexSearch レスポンシブデザイン ダークモード 多言語対応 SEO最適化</span>
{{< /rawhtml >}}