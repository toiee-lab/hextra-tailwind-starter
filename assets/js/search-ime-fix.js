// IME対応検索機能の修正
// 日本語の漢字変換確定のエンターキーで検索が実行されないようにする

(function() {
  'use strict';
  
  // IME入力状態を追跡するフラグ
  let isComposing = false;
  
  // 検索入力要素にIME対応イベントを追加する関数
  function setupIMEHandling(input) {
    // 既に処理済みの場合はスキップ
    if (input.hasAttribute('data-ime-setup')) {
      return;
    }
    
    input.setAttribute('data-ime-setup', 'true');
    
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
  }
  
  // 検索入力要素を見つけてIME対応を設定する関数
  function initializeSearchInputs() {
    // Hextraの検索入力要素を取得（正しいクラス名を使用）
    const searchInputs = document.querySelectorAll('.hextra-search-input');
    
    searchInputs.forEach(setupIMEHandling);
  }
  
  // DOM読み込み完了後に実行
  document.addEventListener('DOMContentLoaded', initializeSearchInputs);
  
  // 動的に追加される要素も監視（Hextraが後から検索機能を初期化する場合に対応）
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        // 追加されたノードが要素ノードの場合
        if (node.nodeType === Node.ELEMENT_NODE) {
          // 追加された要素自体が検索入力の場合
          if (node.classList && node.classList.contains('hextra-search-input')) {
            setupIMEHandling(node);
          }
          // 追加された要素の子要素に検索入力がある場合
          const childInputs = node.querySelectorAll && node.querySelectorAll('.hextra-search-input');
          if (childInputs) {
            childInputs.forEach(setupIMEHandling);
          }
        }
      });
    });
  });
  
  // DOM全体の変更を監視開始
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // ページ読み込み後にも一度チェック（Hextraの初期化が遅い場合に対応）
  window.addEventListener('load', function() {
    setTimeout(initializeSearchInputs, 100);
  });
})();