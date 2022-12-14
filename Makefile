prepare:
	copy Makefile ".\src"
all: prepare
	make -C src build
build: 
	csc /target:library /r:../lib/Kompas6API5.dll,../lib/KAPITypes.dll,../lib/Kompas6Constants.dll,../lib/Kompas6Constants3D.dll /out:../kompasAddon.dll *.cs
	make clean
clean:
	del Makefile
up:
	node ./dist/crutchServer.js
reg:
	regasm kompasAddon.dll /tlb /codebase
run:
	dotnet run --project "c:\Users\kiril\Documents\kompas-save-as-html-addon\src\Program.csproj"