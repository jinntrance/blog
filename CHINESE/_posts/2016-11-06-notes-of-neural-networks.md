---
layout: post
title: "《神经网络》课程笔记"
modified: 2016-11-06 20:43:28 +0800
tags: [神经网络]
categories: [机器学习]
mathjax: true
mermaid: true
image:
  feature: 
  credit: 
  creditlink: 
comments: 
share: 


---

Geoffrey Hinton 在多伦多大学的《[Neural Networks for Machine Learning][NNML] 》课程最近开课，赶紧跟上。

[TOC]

## Week 1

重点介绍NN 如何受到神经元启发而做成。神经元分位四个部分：

1. receptive zone 靠近细胞体的树突（dendrite）可以从不同神经元接收信号。
2. trigger zone 决定是否产生神经冲动spike 并传输给下一个神经元。
3. conducting zone 长长的轴突axon 传输神经电位。
4. output zone 神经末梢输出电位。

对比NN 和神经元的结构：

```mermaid
graph LR
    subgraph input
    x1
    x2
    end
    
    subgraph hiddenLayer
    z1[cell body] --> |axon hillock| a1[spike]
    z2 --> |activation| a2   
    end
    
    x1 --> |dendrite| z1
    x1 --> z2
    x2 --> z1
    x2 --> z2
    
    subgraph output
    o1 --> h
    end
    a1 --> |dendrite| o1
    a2 --> o1

    
```



而activations 函数常用的有：

- **Binary Threshold Neurons** $z\ge threshold$ 时输出1，否则输出0。 
- **Rectified Linear Neurons** (linear threshold neurons)  当 $z\ge 0$ 时输出1，否则输出0。
- **Sigmoid Neurons** 使用sigmoid输出一个 $[0,1]$ 之间的值。



## Week 2

### Main Types of NN architecture

**RNN**: t 时刻某hidden layer的输出也可作为t+1 时刻hidden layer的输入，从而也就有了记忆过去hidden layer weights 的能力。所以RNN 处理时序输入很有优势。

```mermaid
graph LR
    subgraph t
    input1[input] --> hidden1[hidden]
    hidden1 --> output1[output]
    end
    subgraph t + 1
    input2[input] --> hidden2[hidden]
    hidden2 --> output2[output]
    end
    subgraph t + 2
    input3[input] --> hidden3[hidden]
    hidden3 --> output3[output]
    end
    
    hidden1 --> hidden2
    hidden2 --> hidden3
    
```



RNN 基础上，神经元之间连接都是双向的，称为**Boltzmann machines**

Boltzmann machines 中没有hidden units 的时候称为 **Hopfield nets**



### First Generation of NN

1. 第一个时期**Perceptron Algorithm**:  根据经验或程序，把原始输入$\vec x$ 转化为对应的特征$\vec f = F(\vec x)$ ,  然后学习求解对于 $ \vec   z = \vec f \cdot \vec w$ 。然后对于$z_i > threshold$ 的样本记为正样本，否则为负样本。学习中权重更新按照：
   - output 正确，不修正权重。
   - output 出错，且输出0，修正权重 $\vec w = \vec w + \vec f$
   - output 出错，且输出1 ，修正权重 $\vec w = \vec w - \vec f$
2. **McCulloch-Pitts** 总结前面总要有阀值，多不方便。直接把阀值当作一个权重岂不就可以了？ $\vec z = \vec x \cdot \vec w + bias = \begin{vmatrix} 1 \\\\ \vec x \end{vmatrix} \cdot \begin{vmatrix} bias \\\\ \vec w \end{vmatrix}$  （其实$bias = -threshold$ ），然后用z 值跟0 比较大小判断正负样本即可。




## Week 3

### Linear neurons

主要是求解$\vec w^T$ 使得在$\vec h = \vec w^T \vec x$ 中 Squared Error Loss $L = \frac 1 2 \sum_i (y_i - h_i)^2$ 最小。其中$y_i$ 代表第i 个样本真实的label。

而每次更新权重就按照负向梯度方向更新权重 $\Delta w_i = - \epsilon * \frac{\partial L}{\partial h_i}  * \frac{\partial h_i}{\partial w_i} = \epsilon * \sum_i (y_i - h_i) * x_i$ 这个来。

### Logistic Neurons

实际上就是求解 $h = \frac{1}{1+e^{-z}}$ （$z = \vec w^T * \vec x$ 而可求解 $\frac{\partial h}{\partial z} = h(1-h)$ ），从而使得上面一样定义的Squared Error Loss 最小，则可求 $\frac{\partial L}{\partial w_i} = - \sum (y_i -h _i) * h_i(1-h_i) * x_i$ 然后更新权重 $\Delta w_i = - \frac{\partial L}{\partial w_i} $ 。

### BP Algorithm

如果不用神经网络，只用LR，那么就需要人工去设计特征。而如果有神经网络后，特别是隐层的神经元可以前向交叉相乘从而达到组合特征的目的。

那么问题来了，有这么多组合后的特征，怎么调整才能效果最好呢？

1. 一种方法就是不停的调整一些神经元权重大小，然后评估这次调整是变好还是变坏。变好就选择新的权重，不者就再尝试新的调整。当然可以并行计算各个神经元的改变值，也可以尽量随机的改变权重，但当神经元个数太大时，这种方法计算消耗还是太大。
2. 用BP 反向找梯度，则能比较好的找到最优的权重改变方向。使用$h_i^l$ 代表每$l$层的输出，下一层的输入$z_j^{l+1} = \sum_i h_i^l * w_{ij}^l$ ，则梯度为 $\frac{\partial L}{\partial h_i^l } = \sum_j \frac{dz_j^{l+1}}{dh_i^l} \frac{\partial L}{\partial z_j^{l+1}} = \sum_j \frac{dz_j^{l+1}}{dh_i^l} \frac{\partial h_j^{l+1}}{\partial z_j^{l+1}} \frac{\partial L}{\partial h_j^{l+1}} = \sum_j w_{ij} * h_j^{l+1}(1-h_j^{l+1})\frac{\partial L}{\partial h_j^{l+1}}$



**Mathjax was not loaded successfully**{:.mathjax_alt}

[NNML]: https://www.coursera.org/learn/neural-networks/home/welcome