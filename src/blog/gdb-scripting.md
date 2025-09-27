# GDB Scripting

GDB stands for GNU Debugger and it can be an extremely useful tool when tracing through code: breakpoints, backtraces, examining memory, etc. I learned to use GDB as part of my Computer Systems class in Spring 2023, but didn’t learn about GDB scripting until my summer internship in 2024.

GDB Scripting allows you to automate a GDB debugging session. This can be a powerful tool for hackers performing process injection on a process with a watchdog timer: if the process isn’t running for a certain amount of time, the watchdog timer detects that something isn’t right and just suspends execution of the program. Automating the GDB commands allow for an attack that is much faster and much less detectable.
