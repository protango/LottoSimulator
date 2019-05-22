%lotto land
p = 1/76767600; % chance of winning
pi = (1/p-1)*p; % chance of loss
n = 135101890; % numbers of players
u = rand(); % random variable

x=1:135101890;
cdf = pi.^(n-x);

r = geornd(p);

winners = n / r
naiveWinners = n * p