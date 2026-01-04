# Quiz Question Text Review Issues

## Issue 1: 「シャインプルーフの原理」の表記揺れ・誤記
- **Location**: `src/data/questions.json` (id: 52)
- **Problem**: 「シャインプルーフの原理」は一般的に「シャイムフルークの原理（Scheimpflug）」が正しい表記。誤記により学習者が混乱する恐れがある。
- **Suggested Fix**: 問題文・解説・選択肢内の表記を「シャイムフルークの原理」に修正する。

## Issue 2: APEX値の解説式が誤り
- **Location**: `src/data/questions.json` (id: 70)
- **Problem**: 解説の「Av=N×2=F値の関係」は誤り。正しくは `Av = log2(N^2)` で、Avが1増えるとF値は√2倍になる。
- **Suggested Fix**: 式を正しいAPEXの定義に修正し、Av=5 → F5.6 の根拠が伝わるように書き換える。
