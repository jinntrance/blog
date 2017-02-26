---
layout: post
title: "Intro to NLP 笔记"
modified: 2015-10-23 20:46:22 +0800
tags: [NLP,勤学札记]
categories: [机器学习]
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 

---

之前接触的NLP 知识都不系统借着学习《[Introduction to Natural Language Processing](https://class.coursera.org/nlpintro-001/)》 的机会，系统的了解了解。另外可参考的课程包括：

- [Natural Language Processing
  by Dan Jurafsky, Christopher Manning](https://class.coursera.org/nlp/lecture) 
- [Natural Language Processing
  by Michael Collins](https://www.coursera.org/course/nlangp) 高级的版本

## Intro

做语音识别时特别需要 [IPA Chart](http://www.internationalphoneticalphabet.org/ipa-sounds/ipa-chart-with-sounds/) ，这个上面也配有发音。

NLP 的难点，除了理解语法语义，歧义是其另一大难点，而歧义种类分如下几种：

> 
- Morphological: Joe is quite impossible. Joe is quite important.
- Phonetic: Joe’s finger got number.
- Part of speech: Joe won the first round.
- Syntactic: Call Joe a taxi.
- Pp attachment: Joe ate pizza with a fork / with meatballs / with Samantha / with pleasure.
- Sense: Joe took the bar exam.
- Modality: Joe may win the lottery.
- Subjectivity: believes that stocks will rise.
- Negation: likes his pizza with no cheese and tomatoes.
- Referential: yelled at Mike. He had broken the bike. yelled at Mike. He was angry at him.
- Reflexive: John bought him a present. John bought himself a present.
- Ellipsis and parallelism: gave Mike a beer and Jeremy a glass of wine.
- Metonymy: called and left a message for Joe.

除去上面提到的问题，不标准的语言（俚语、新词等）、语法错误、字词错误、计算机解析、复杂句、幽默讽刺、指代、潜在意思等。等也是NLP 做起来比较困难的地方。

然后介绍了语言学的一些知识（ Linguistic Knowledge）：
> 
- Phonetics and phonology - the study of sounds
- Morphology - the study of word components
- Syntax - the study of sentence and phrase structure
- Lexical semantics - the study of the meanings of words
- Compositional semantics - how to combine words
- Pragmatics - how to accomplish goals
- Discourse conventions - how to deal with units larger than utterances

接着介绍了一些语言学的知识，比如PIE 及衍生语簇及子各语支。
还有比较重要的是语音演变规则：
> **Grimm’sLaw**
>
- Voiceless stops turn into voiceless fricatives
- Voiced stops become voiceless stops
- Voiced aspirated stops change to voiced stops or fricatives
> **Examples**
>
> - Ancient Greek: πούς, Latin: pēs, Sanskrit: pāda –  English: foot, German: Fuß, Swedish: fot
> - Ancient Greek: κύων, Latin: canis, Welsh: ci –  English: hound, Dutch: hond, German: Hund

接着介绍了世界语言的几个链接：

- [Ethnologue](http://www.ethnologue.com)
- [Numbers in many languages](http://www.zompist.com/numbers.shtml)
- [World Languages Family](https://en.wikipedia.org/wiki/List_of_language_families)
- [Atlas of Language Structures](http://wals.info)



**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: true}}); </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}


