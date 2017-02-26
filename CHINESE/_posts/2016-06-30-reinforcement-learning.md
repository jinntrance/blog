---
layout: post
title: "Reinforcement Learning"
modified: 2016-06-30 11:23:57 +0800
tags: [深度学习]
categories: [机器学习]
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 

---

增强学习，就是在既定环境下给予相应行动，改变环境状态，并进一步进行下一步增强的过程。

设第i 步的状态是\`s_i\` ，第i 步行动是\`a_i\`，而第i 步的reward 为\`r_{i+1}\`,

则第t 步之后的*total future reward* 就为 \` R_t = sum_{i=t}^n r\_i\` ，而因为未来是不确定的也是随机的，则可以用一个随机因子来表示未来的不确定性，则 **discounted future reward** 为 \`R_t = r_t + gamma R\_{t+1}\`

再设定 \`Q(s_t, a_t) = max(R_{t+1})\` （实际就是*Q-learning*）， 则最后优化的问题就变成了
\`pi(s) = argmax_a Q(s, a)\` , 其中 $\pi$ 代表policy(选action 的策略)。

同理有\`Q(s_t, a_t) = r\_{t+1} +  gamma * max_{a\_{t+1}} Q(s\_{t+1}, a\_{t+1})\`

为了优化前面的Q-value，使用Deep Q Network ，输入84*84 灰度的游戏屏幕截图，输出每个actions 对应的Q-value。 

**Experience Replay** 把历史上所有的<s, a, r, s'>  对放在replay memory中，然后训练时随机选取部分片段出来训练（更像有监督学习了），并且会有local minimum，从而节省训练时间。


- RL defines the objective
- DL gives the mechanism
- AI = RL + DL = general intelligence

### DL 
Linear transformations： $$h_{k+1} = Wh_k$$

Non-linear  activation functions $$h\_{k+2} = f(h_{k+1})$$

### RL 

An RL agent may include one or more of these components:

- **Policy** $\pi$: agent’s behaviour function
- **Value function** $Q(s, a)$: how good is each state and/or action
- **Model**: agent’s representation of the environment


### Value-Based RL


设权重$\vec w$ 使得最佳值为 $Q(s_t, a_t, \vec w) $


设定\`r_t +  gamma * max\_{a\_{t+1}} Q(s\_{t+1}, a\_{t+1}，\vec w)\` 为拟合目标


然后可以通过SGD 求MSE \`loss = (r_t +  gamma * max_{a\_{t+1}} Q(s\_{t+1}, a\_{t+1}，\vec w) - Q(s_t, a_t, \vec w))^2\` 优化。

- 每次迭代的max 只有唯一解时则收敛
- NN 则不收敛, 因为：样本之间的相关性，拟合目标一直在变化 


为了解决NN 不收敛的问题，使用agent 自己的历史，并修改loss funciton：\`loss = (r_t +  gamma * max_{a\_{t+1}} Q(s\_{t+1}, a\_{t+1}，\vec w^-) - Q(s_t, a_t, \vec w))^2\`， 目标参数$\vec w^-$ 固定不变


之后使用 DoubleDQN 优化，使用$\vec w$ 选定actions， 而使用 $\vec w^-$ 评估actions，然后有：

\`loss = (r_t +  gamma * max\_{a\_{t+1}} Q(s\_{t+1}, argmax\_{a\_{t+1}} Q(s\_{t+1}, a_{t+1}, vec w)，\vec w^-) - Q(s_t, a_t, \vec w))^2\`

prioritised replay
DUELLING network


### Policy-based RL

**Deep Policy Networks**

把权重$\vec u$ 应用于Deep network 的policy 
$a = \pi (a | s, \vec u)$

同样可以定义目标函数 \`L(\vec u) = bbb E [sum_{i=1} gamma ^ {i-1} r_i  | pi (a | s, vec u)] = bbb E [ Q^{pi}(s, a) | pi (a | s, vec u)]\` 然后使用SGD 优化目标


\`
{del L(vec u)} / {del u} = bbb E [{ del Q^{pi}(s, a)} / {del a} {del a} / {del \vec u}]
\`

这个当然也可以通过SGA(stochastic gradient ascent) 求解


[RL1]:https://www.nervanasys.com/demystifying-deep-reinforcement-learning/


**Mathjax was not loaded successfully**{:.mathjax_alt} 
{% comment %}
<script type='text/x-mathjax-config'> MathJax.Hub.Config({ asciimath2jax: { delimiters: [['`','`']] }, tex2jax: {inlineMath: [['$', '$']], displayMath: [['$$', '$$']], processEscapes: true}});  </script>
<script type='text/javascript' src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML' async='async'></script>
{% endcomment %}

