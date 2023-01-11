# ios 타입 구분하는 방법
cat /root/anaconda-ks.cfg

출력값을 비교합니다.

## DVD 
@^graphical-server-environment
@base
@core
@desktop-debugging
@dial-up
@fonts
@gnome-desktop
@guest-agents
@guest-desktop-agents
@hardware-monitoring
@input-methods
@internet-browser
@multimedia
@print-client
@x11
chrony
kexec-tools

## minimal
%packages
@^minimal
@core
chrony
kexec-tools
