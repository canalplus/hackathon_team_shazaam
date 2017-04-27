#!/bin/bash
srcdir=$1
destdir=$2
echo Transform $srcdir to $destdir

#rm $file*.mp3
#nbFile=`ls| wc -l`
for file in `ls $srcdir` 
do
	echo Transform $file
	#rm $file*.mp3
	ffmpeg -y -i $srcdir/$file -vn -acodec libmp3lame $destdir/$file.mp3 > /dev/null 2>&1
	duration=`ffprobe -i $destdir/$file.mp3 -show_format -v quiet | sed -n 's/duration=\([0-9]*\)\..*/\1/p'`
	echo $duration
	snippet=15
	echo `seq 0 $((duration/snippet))`

	for i in `seq 0 $((duration/snippet))`
	do
	  	ffmpeg -y -ss $((i*15)) -t 15 -i $destdir/$file.mp3 $destdir/$file-$i.mp3 > /dev/null 2>&1
	done
done

