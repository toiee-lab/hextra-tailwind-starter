// IME対応検索機能の修正
// 日本語の漢字変換確定のエンターキーで検索が実行されないようにする

(function() {
  'use strict';
  
  // IME入力状態を追跡するフラグ
  let isComposing = false;
  
  // DOM読み込み完了後に実行
  document.addEventListener('DOMContentLoaded', function() {
    // 検索入力要素を取得
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(function(input) {
      // IME変換開始時
      input.addEventListener('compositionstart', function() {
        isComposing = true;
      });
      
      // IME変換確定時
      input.addEventListener('compositionend', function() {
        isComposing = false;
      });
      
      // エンターキーのハンドリングを修正
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && isComposing) {
          // IME変換中のエンターキーは何もしない
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
      }, true); // キャプチャフェーズで実行して元のハンドラーより先に処理
    });
  });
})();