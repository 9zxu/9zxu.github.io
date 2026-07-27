---
date: 2025-12-01T00:00:00+08:00
draft: false
title: Linear Algebra
categories:
tags:
  - linear-algebra
  - math
math: true
---

# Matrix Operations
### invertible
$AA^{-1}=I$
$(AB)^{-1} = B^{-1}A^{-1}$

### symmetric
$A^T = A$
$(AB)^{T} = B^{T}A^{T}$

### determinants
> [!TIP]
> If $A$ is a $n \times n$ matrix with $n \ge 2$, $det(A)$ can be expressed as co-factor expansions of any row of $A$.

- $det(AB) = det(A)det(B)$
- $det(A^T) = det(A)$
- $det(E)$ = 

# Linear Dependency
$$
c_1v_1+c_2v_2+c_3v_3+...+c_nv_n
$$

Let $v_1...v_m$ be a collection of $m$ vectors in vector space $V$ with dimension $n$, since $v_1...v_n$ spans $V$

- If $m<n$ and $v_1...v_m$ are $L.I.$
$v_1...v_m$ span the subset of $V$
- If $m<n$ and $v_1...v_m$ are $L.I.$
$v_1...v_m$ span $V$
- If $m>n$, 
$v_1...v_m$ must be $L.D.$

## $n \times n$
If A is a $n \times n$ square matrix. \
By definition, $N(A) = \{ x \in R^n \mid Ax  =0 \}$ is the solution set to $Ax=0$. \
If $N(A) = \{0\}$, $Ax=0$ has only the trivial solution $\{0\}$, then $A$ is non-singular, $det(A) \not= 0$ **(Theorem 1.5.2)**, 
and the column vectors of $A$ are $L.I.$ **(Theorem 3.3.1)**. 
Since A is non-singular, $Ax=c$ has a unique solution **(Corollary 1.5.3)**.

### Equivalent conditions for Non-singularity
$A$ is a $n \times n$ matrix
- $A$ is non-singular
- $Ax=0$ has only trivial solution
- $A$ is row equivalent to $I$

> [!TIP]
> $rank(A) = n$ and $nullity(A) = 0$ \
> $A$ has no free variables in its row-echelon form.

## $R^{m \times n}$
- $V$ is a $m \times n$ matrix
- $V$ contains $m$ linear equations with $n$ unknowns
- $V \in R^{m \times n}$
- $V=(a_1,a_2,...a_n)$ contains $n$ column vectors with $a_i \in R^m$

## solutions and consistency
3.6.3 

$Ax=b$ is **consistent** iff $b \in C(A)$. 

Then $Ax=b$ has the solution, and $b$ can be represented as linear combination of column vectors.

### rank-nullity theorem
$rank(A) \le n$

### case $b \in C(A)$
- if $m<n$, $rank(A) < m < n$
    - $rank(A) < n$, $nullity(A)>0$, infinitely many solutions.
- if $m>n$, the system must be overdeterminated and the $m$ row vectors are $L.D.$.
    - $rank(A) < n$, $nullity(A)>0$, infinitely many solutions.
    - $rank(A) = n$, $nullity(A)=0$, a unique solution.
- if $m=n$, $rank(A) \le n=m$
    - $rank(A) < n$, $nullity(A)>0$, infinitely many solutions.
    - $rank(A) = n$, $nullity(A)=0$, a unique solution.

#### For $rank(A) < n$, $nullity(A)>0$, infinitely many solutions.
A homogeneous system with more unknowns than equations has nontrivial solutions.

#### For $rank(A) = n$, $nullity(A)=0$, a unique solution.
If $v_1,v_2,...,v_m$ span $C(A)$, $rank(A) = m$.

Any vector $b \in C(A)$ can be represented **uniquely** by linear combination of $v_1,v_2,...,v_m$, which indicates that $Ax=b$ has a unique solution.

### case $b \notin C(A)$
- inconsistent
    - no solution

### a simple way to determinate
There are $m$ equations with $n$ unknowns.

- $rank(A) = rank([A\|b]) = n$, unique solution.
- $rank(A) = rank([A\|b]) < n$, infinitely many solutions (underdetermined).
- $rank(A) < rank([A\|b])$, inconsistent.

## rank-nullity theorem
$A$ is a $m \times n$ matrix.

$rank(A) + nullity(A) = n$

- $U$ is $RREF$ of $A$
- $\dim(A)$ is the size of basis (minimum spanning set)
- $nullity(A) = \dim N(A)$
    - = number of free variables in $U$
- $rank(A)$ is the dimension of the row space of $A$
    - = number of nonzero rows in $U$
    - = number of lead variables in $U$

## changing coordinates
$basis \times coordinates$:
$$
\begin{bmatrix}
v_1 & v_2
\end{bmatrix}
\begin{bmatrix}
c_1 \\
c_2
\end{bmatrix} =
\begin{bmatrix}
u_1 & u_2
\end{bmatrix}
\begin{bmatrix}
d_1 \\
d_2
\end{bmatrix} =
\begin{bmatrix}
e_1 & e_2
\end{bmatrix}
\begin{bmatrix}
x_1 \\
x_2
\end{bmatrix}
$$
$Vc=Ud$
$d=U^{-1}Vc$

# Linear Transformations
$L: V \rightarrow W$
A mapping $L$ from a vector space $V$ to a vector space $W$

> [!TIP]
> $L(x)$ is a linear transformation iff $L(\alpha x + \beta y) = \alpha L(x) + \beta L(y)$

#### mapping examples
Linear transformation types include **rotation**, **reflection**, **scaling**, and **shear**.
- $L(x) = 3x$ scaling
- $L(x) = e_1 x_1 = (x_1,0)^T$ : project to $x_1$-axis
- $L(x) = (x_1,-x_2)^T$ reflection by $x$-axis
- $L(x) = (-x_2,x_1)^T$ left rotation 90

> Difference between **changing coordinates** and **linear transformations**?

**changing coordinates** doesn't change the original vector, but changes the representation of the vector only (換參考點，從不同角度觀察同一個物體).

> [!WARNING]
> **linear transformation** directly change the vector itself. (藉由拉長、平移、旋轉、鏡射改變物體本身)

- $S$ is a subspace of $V$
- $L$ is a linear transform
- $L(S)$ is a **image** of $S$
- $L(V)$ is the **range** of $L$ -> column space ?
- $v \in ker(L)$, $L(v) = \{0\} \in W$ -> nullspace ?


## Matrix representation Theorem
- ordered bases $E \in V$, $F \in W$
- $\dim V = n$, $\dim W = m$
- coordinate vector $x$ respected to $E$, $y$ respected to $F$

$m \times n$ matrix $A$, representing $L = V \rightarrow W$
$Ax=y$

- change of bases problem = coordinate transformation problem (inverted matrix)

# Orthogonality

## Scalar product
- Vector length, distance between two vectors
- Angles between two vectors
- Definition of orthogonality
- Projection, projection matrix
- Plane equation and normal vector
- Distance from a point to a plane.
- Pythagorean Law

## Orthogonal subspace

- Definition of orthogonal subspaces.
- Definition of orthogonal complement of a subspace

Each vector in $N(A)$ is orthogonal to every vectors in $C(A^T)$ \
-> $N(A)$ and $C(A^T)$ are orthogonal complement. \
-> $N(A)$ and $C(A^T)$ are orthogonal spaces.


orthogonal complement -> orthogonal spaces
(one way only)

## Fundemantal subspace theorem
- Fundamental Subspaces of a matrix
- Fundamental Subspace Theorem 5.2.1

- $A$ is a $m \times n$ matrix.
- $A$ is a linear system with $m$ equations and $n$ unknowns.
- $A$ is a linear transformation from $R^n$ to $R^m$.
- $C(A)$ is **range** of $A$. (solutions space is spanned by $C(A)$)
- $C(A)$ is a subspace of $R^m$.

> [!CAUTION]
> $N(A)^\bot = C(A^T)$ and $N(A^T)^\bot = C(A)$

- Algorithm of computing the bases of four
fundamental subspaces of a given matrix A
  1. Find $RREF$ form of $A$ and $A^T$.
  2. Solve free variables for $N(A)$ and $N(A^T)$.
  3. Find non-zero rows for $C(A^T)$ and $C(A)$

> [!WARNING]
> $RREF$ can only find a **basis** of **row space** $R(A)$, but not column space $C(A)$.

- Definition of direct sum
- Theorem 5.2.2, Theorem 5.2.3, Theorem 5.2.4
- Corollary 5.2.5

### Direct sum
$X$ and $Y$ are subspace of $V$.
$X \oplus Y = V$ iff $\forall v \in V,\space\exists\space x \in X, \space y \space \in Y$, s.t. $x+y=w$
If $S$ is a subspace of $R^n$:
$R^n = S \oplus S^\bot$ 
$(S^\bot)^\bot = S$

## Least square problem
- Formulation of linear least square problem
    - Residual
    - Geometrical meaning of residual and projection
- Normal equation
    - Theorem 5.3.2
    - Projection matrix
- Applications
    - Solving overdetermined system
    - Curve fitting

For $A\hat{x}=b$, find a $p \in C(A)$ that is closet to $b$.
residual $r(x) = p-b$
$p$ is the projection from $b$ to $C(A)$.

## Inner product space
- norm
- complex inner product
- projection $\frac{\langle x,v\rangle}{\langle v,v\rangle}v$
    - if $v$ is an unit vector, let's say it is $u$, then the projection is $\langle x,u \rangle u$
    
## Orthonormal sets
- orthogonal matrix that is not a basis.
- Orthogonal vectors implies linearly independent
- least square and the solution of the normal equation

### orthonormal matrix
$$
Q^TQ = I
$$
- $Q$ is a $n \times n$ matrix whose column vectors are orthonormal vectors, forming an orthonormal basis for $R^n$
- orthonormal vectors have the property $q^Tq=1$ ( dot product $q \cdot q = \|q\|^2$ and orthonormal vectors have length 1)
- If $Q$ is orthonormal space, then $Q^T$ is also orthonormal space.

> [!NOTE]
> pf. think of it as a matrix

## The Gram-Schmidt Orthogonalization Process
- Gram-Schmidt Process.
- Existence of orthonormal basis for finite dimension inner product spaces.
- Existence of orthonormal basis for 𝑆 and 𝑆⊥
- Get an orthonormal basis by a existing basis

Process
1. nomalize the vector
2. recursively obtain $u_{k+1} = \frac{1}{ \| x_{k+1} - p_k \| } (x_{k+1} - p _k)$

# Eigen 
If there exists non-zero vector $x$ such that $Ax = \lambda x$, $x$ is called **eigenvector**, and $\lambda$ is called **eigenvalue**.

1. find the eigenvalue $\lambda$ by solving **charecteristic equation** $\det (A-\lambda I) = 0$
2. for each $\lambda$, get the eigenvector space $N(A-\lambda I)$, the **eigenspace**

sum of all diaognal elements of $A$ is called **trace**

If $A$ is similar to $B$, then they share the same chacteristic polynomial and the same eigenvalue. $\det (A-\lambda I) = \det (B-\lambda I)$

$A$ is diagonalizable -> column vectors of $X$ are L.I.

#### similarity
$A$ and $B$ are similar if and only if there exists non-singular matrix $P$ such that $B = P^{-1}AP$, where $P$ is the change-of-basis matrix. 
```
basis E of V ----A----> V
|			|
|			|
P			P-1
|			|
|			|
v			v
basis F of V ----B----> V
```

- $A$ and $B$ are different matrix representation of the same linear transformation in different basis.
- Two similar matrix share the same eigenvalue, determinants, trace and rank.

#### diagonalization
$A$ is diagonalizable if $A$ is similar to a diagonal matrix $D$, $A = PDP^{-1}$.
- diagonal entries of $D$ are eigenvalues of $A$
- column vectors of $P$ are eigenvectors of $A$
- $P$ is not unique, reordering columns or multiplication by scalars form a new diagonal matrix.
- **defective** matrix is not diagonalizable, with $A$ has less then $n$ L.I. column vectors.

# ref
- Linear-Algebra-with-Applications-10-global
- [線性映射與座標變換](https://ccjou.wordpress.com/2009/09/24/線性映射與座標變換/)
- [线性代数学习笔记（计算机图形学）](https://juejin.cn/post/7230419964301885501)
