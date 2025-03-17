pid_websersocket=$(pgrep -f "websersocket_a4104f18-de75-4365-a927-3fbb964e90af.js")
watch -n 1 ps -p $pid_websersocket -o pid,etime,%cpu,%mem,cmd