# レッスン 3: CSS - 見た目を美しく 🎨

**所要時間**: 30分
**難易度**: ★★☆☆☆
**前提**: レッスン1、2を完了していること

---

## 🎯 このレッスンで学ぶこと

- CSSの基本文法
- Camera Quizで実際に使われているスタイル
- 色、フォント、レイアウトの指定方法
- アニメーションの仕組み

---

## 📖 CSS とは？

**CSS (Cascading Style Sheets)** = Webページの「見た目」を決める言語

### 日常の例え

```
HTML = 家の骨組み
CSS  = 壁紙、ペンキ、家具の配置
```

HTMLだけだと味気ない白黒のページですが、CSSを加えることで：
- 色がつく ✨
- フォントが変わる 📝
- レイアウトが整う 📐
- アニメーションがつく 🎬

---

## 🔤 CSS の基本文法

### 基本の形

```css
セレクタ {
  プロパティ: 値;
  プロパティ: 値;
}
```

**実際の例：**

```css
.start-button {
  background: #d4a853;
  padding: 18px 56px;
  color: #1a1a1a;
}
```

**分解してみると：**

```
.start-button     ← セレクタ（どの要素に適用するか）
{
  background: #d4a853;      ← 背景色をゴールドに
  padding: 18px 56px;       ← 内側の余白を指定
  color: #1a1a1a;           ← 文字色を暗い色に
}
```

---

## 🎨 Camera Quiz で使われている実際のCSS

### 例1: タイトルのスタイル

`src/index.css` の167行目あたり：

```css
.title-main {
  font-family: 'Playfair Display', serif;
  font-size: 3.2rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: var(--text-primary);
  text-shadow: 0 2px 20px rgba(245, 245, 240, 0.1);
}
```

**1行ずつ解説：**

```css
font-family: 'Playfair Display', serif;
```
↑ フォント（書体）を指定
  - 'Playfair Display' を使用
  - なければ serif（明朝体風）を使用

```css
font-size: 3.2rem;
```
↑ 文字の大きさ
  - `rem` = 基準サイズの3.2倍
  - かなり大きい！（タイトルだから）

```css
font-weight: 700;
```
↑ 文字の太さ
  - 100〜900で指定
  - 700 = 太字（bold）

```css
letter-spacing: 0.25em;
```
↑ 文字と文字の間隔
  - 0.25em = 文字幅の25%分空ける
  - 広めにして高級感を演出

```css
color: var(--text-primary);
```
↑ 文字の色
  - `var(--text-primary)` = 変数を使用
  - 実際の色は `#f5f5f0`（オフホワイト）

```css
text-shadow: 0 2px 20px rgba(245, 245, 240, 0.1);
```
↑ 文字の影
  - 横: 0px（真下）
  - 縦: 2px（下に2px）
  - ぼかし: 20px（広く薄く）
  - 色: 白っぽい色で透明度10%

---

### 例2: スタートボタンのスタイル

`src/index.css` の192行目あたり：

```css
.start-button {
  margin-top: 32px;
  padding: 18px 56px;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--bg-dark);
  background: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dim) 100%);
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(212, 168, 83, 0.3);
}
```

**注目ポイント：**

#### 📏 余白の指定
```css
margin-top: 32px;    /* 外側の余白（上だけ） */
padding: 18px 56px;  /* 内側の余白（上下18px、左右56px） */
```

**図解：**
```
┌─────────────────────────────┐
│    margin-top: 32px         │ ← 外側の余白
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │  padding: 18px 56px     │ │ ← 内側の余白
│ │  ┌───────────────────┐  │ │
│ │  │   START           │  │ │ ← ボタンの文字
│ │  └───────────────────┘  │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

#### 🌈 グラデーション
```css
background: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dim) 100%);
```

**意味：**
- `linear-gradient` = 線形グラデーション
- `135deg` = 左上から右下へ（対角線）
- `var(--accent-gold)` → `var(--accent-gold-dim)`
  明るいゴールド → やや暗いゴールド

**視覚的に：**
```
明るい ┌──────────┐ やや暗い
  #d4a853 ────▶ #b8923f
        135度
```

#### ✨ ホバー効果（マウスを乗せたとき）

`src/index.css` の222行目：

```css
.start-button:hover {
  background: linear-gradient(135deg, #e0b862 0%, var(--accent-gold) 100%);
  transform: translateY(-3px);
  box-shadow: 0 6px 30px rgba(212, 168, 83, 0.4);
}
```

**`:hover` = マウスを乗せたとき**

```css
transform: translateY(-3px);
```
↑ ボタンが**3px上に移動**（浮き上がる）

```css
box-shadow: 0 6px 30px rgba(212, 168, 83, 0.4);
```
↑ 影が**濃く・大きく**なる（より浮いた印象）

---

### 例3: 難易度選択ボタンのアニメーション

`src/index.css` の555行目あたり：

```css
.difficulty-option::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: var(--accent-gold);
  transform: scaleY(0);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.difficulty-option:hover::before {
  transform: scaleY(1);
}
```

**これは何？**

ボタンの**左端に出てくる縦線**です！

**仕組み：**

1. `::before` = 要素の前に**見えない要素**を追加
2. 普段は `scaleY(0)` で**高さゼロ**（見えない）
3. ホバー時に `scaleY(1)` で**元の高さ**に戻る
4. `transition` でアニメーション

**視覚的に：**

```
通常時:
┌─────────────┐
│  すべて      │  ← 線は見えない
└─────────────┘

ホバー時:
┃─────────────┐
┃  すべて      │  ← 金色の線が出現！
┗─────────────┘
```

---

## 🎬 アニメーションの仕組み

### フェードインアニメーション

`src/index.css` の91〜105行目：

```css
.start-screen {
  animation: fade-in 0.6s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**ステップバイステップ：**

```
開始時（from）:
  opacity: 0              ← 完全に透明
  translateY(20px)        ← 下に20pxズレた位置

          ↓ 0.6秒かけて変化

終了時（to）:
  opacity: 1              ← 完全に見える
  translateY(0)           ← 元の位置
```

**動きのイメージ：**
```
[透明・下にズレた状態]
        ↓
   じわ〜っと
        ↓
[見える・正しい位置]
```

---

## 🎨 色の指定方法

Camera Quizでは、**CSS変数**を使って色を管理しています。

### CSS変数の定義

`src/index.css` の3〜17行目：

```css
:root {
  --bg-dark: #1a1a1a;
  --bg-card: #242424;
  --text-primary: #f5f5f0;
  --text-secondary: #a0a0a0;
  --accent-gold: #d4a853;
  --accent-gold-dim: #b8923f;
  --correct-green: #4a9f6e;
  --wrong-red: #c75d5d;
}
```

**`:root` = ページ全体で使える変数を定義**

### CSS変数の使い方

```css
color: var(--text-primary);
```
↑ `--text-primary` の値（`#f5f5f0`）を使用

**メリット：**
- 色を一箇所で管理できる
- テーマカラーを簡単に変更できる
- 名前で覚えられる（`#f5f5f0` より分かりやすい）

---

## 💡 色の種類

### 16進数カラーコード
```css
color: #d4a853;
```
- `#` + 6桁の英数字
- RGB（赤・緑・青）を16進数で表現
- `#RRGGBB` の形式

**例：**
```
#d4a853
  ││││││
  ││└┴┴┴─ 青（53 = 少し）
  └┴──── 緑（a8 = 多め）
  ──── 赤（d4 = かなり多い）

= ゴールドっぽい色
```

### rgba（透明度付き）
```css
box-shadow: 0 4px 20px rgba(212, 168, 83, 0.3);
```
- `rgba(赤, 緑, 青, 透明度)`
- 透明度: 0（透明）〜 1（不透明）
- `0.3` = 30%の不透明度（70%透明）

---

## 📐 レイアウトの基本

### Flexbox

`src/index.css` の532行目あたり：

```css
.difficulty-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
```

**Flexbox = 柔軟なレイアウトシステム**

```css
display: flex;
```
↑ Flexboxを有効にする

```css
flex-direction: column;
```
↑ 縦に並べる（`row` なら横）

```css
gap: 8px;
```
↑ 要素間のスペース = 8px

**視覚的に：**
```
┌─────────────┐
│  すべて      │
├─ 8px ───────┤  ← gap
│  初級        │
├─ 8px ───────┤
│  中級        │
├─ 8px ───────┤
│  上級        │
└─────────────┘
```

---

## 🔍 実践：色を変えてみよう

実際にCSSを編集して、Camera Quizの色を変えてみましょう！

### ステップ1: ファイルを開く

`src/index.css` を開きます。

### ステップ2: 変数を見つける

3〜17行目の `:root` セクションを探します。

### ステップ3: 色を変更

例えば、ゴールドを青に変えてみる：

**変更前：**
```css
--accent-gold: #d4a853;
```

**変更後：**
```css
--accent-gold: #5390d4;  /* 青っぽい色 */
```

### ステップ4: 保存して確認

保存すると、ボタンやアクセントカラーが**青に変わります**！

---

## 🎯 よく使うCSSプロパティ一覧

### 文字関連
```css
font-size: 16px;           /* 文字サイズ */
font-weight: 700;          /* 太さ */
font-family: 'Arial';      /* フォント */
color: #000000;            /* 文字色 */
letter-spacing: 0.1em;     /* 文字間隔 */
line-height: 1.6;          /* 行の高さ */
text-align: center;        /* 中央揃え */
```

### 背景・色
```css
background: #ffffff;       /* 背景色 */
background: url('image.jpg'); /* 背景画像 */
opacity: 0.8;              /* 透明度 */
```

### 余白
```css
margin: 10px;              /* 外側の余白（全方向） */
margin-top: 20px;          /* 上だけ */
padding: 15px;             /* 内側の余白 */
```

### サイズ
```css
width: 200px;              /* 幅 */
height: 100px;             /* 高さ */
max-width: 500px;          /* 最大幅 */
```

### 枠線・影
```css
border: 1px solid #000;    /* 枠線 */
border-radius: 5px;        /* 角を丸く */
box-shadow: 0 2px 4px rgba(0,0,0,0.2); /* 影 */
```

### 配置
```css
display: flex;             /* Flexbox */
position: relative;        /* 相対位置 */
position: absolute;        /* 絶対位置 */
```

### アニメーション
```css
transition: all 0.3s;      /* 変化をアニメーション */
transform: scale(1.1);     /* 拡大・回転など */
animation: fade-in 1s;     /* アニメーション適用 */
```

---

## ✅ 理解度チェック

以下のコードを読んで、何をしているか説明できますか？

```css
.my-button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.my-button:hover {
  background: #0056b3;
  transform: translateY(-2px);
}
```

<details>
<summary>答えを見る</summary>

**解説：**
- ボタンに内側余白を設定（上下10px、左右20px）
- 背景を青色に
- 文字を白色に
- 枠線なし
- 角を5px丸める
- カーソルをポインター（手の形）に
- ホバー時：
  - 背景を濃い青に変更
  - 2px上に移動（浮き上がる）

</details>

---

## 🎯 次のステップ

CSSの基本が理解できたら、次はJavaScriptで動きをつけましょう：

👉 [レッスン 4: JavaScript - ページに命を吹き込む](lesson-04-javascript.md)

---

## 📝 練習課題

### 初級
1. `--accent-gold` の色を好きな色に変えてみる
2. `.title-main` のフォントサイズを `4rem` に変更
3. スタートボタンの `padding` を変えて、大きさを調整

### 中級
4. 新しいCSS変数 `--my-color` を作成して使ってみる
5. `.start-button` のホバー時の動きを `5px` に変更
6. フェードインアニメーションの時間を `1s` に変更

### 上級
7. 新しいアニメーションを `@keyframes` で作成
8. 難易度ボタンの色を全部変える
9. レスポンシブデザインの設定を変更（648行目以降）

---

**お疲れさまでした！🎨**
CSSの魔法で見た目を自由に変えられるようになりましたね！
