import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:video_player/video_player.dart';

class CustomVideoPlayer extends StatefulWidget {
  final XFile video;

  const CustomVideoPlayer({super.key, required this.video});

  @override
  State<CustomVideoPlayer> createState() => _CustomVideoPlayerState();
}

class _CustomVideoPlayerState extends State<CustomVideoPlayer> {
  VideoPlayerController? videoController;
  Duration currentPosition = const Duration();
  bool showControls = false;

  @override
  void initState() {
    super.initState();

    initializeController();
  }

  initializeController() async {
    videoController = VideoPlayerController.file(
      File(widget.video.path),
    );

    await videoController!.initialize();

    videoController!.addListener(() {
      setState(() {
        final currentPosition = videoController!.value.position;

        this.currentPosition = currentPosition;
      });
    });

    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    if (videoController == null) {
      return const CircularProgressIndicator();
    }

    return AspectRatio(
      aspectRatio: videoController!.value.aspectRatio,
      child: GestureDetector(
        onTap: () {
          setState(() {
            showControls = !showControls;
          });
        },
        child: Stack(
          children: [
            VideoPlayer(
              videoController!,
            ),
            if (showControls)
              _Controls(
                isPlaying: videoController!.value.isPlaying,
                onReversePressed: onReversePressed,
                onPlayPressed: onPlayPressed,
                onForwardPressed: onForwardPressed,
              ),
            if (showControls)
              _NewVideo(
                onPressed: onNewVideoPressed,
              ),
            _SliderBottom(
              maxPosition: videoController!.value.duration,
              currentPosition: currentPosition,
              onChanged: onChanged,
            ),
          ],
        ),
      ),
    );
  }

  void onReversePressed() {
    // 현재 영상이 어떤 부분인지
    final currentPosition = videoController!.value.position;

    Duration position = const Duration();

    if (currentPosition.inSeconds > 3) {
      position = currentPosition - const Duration(seconds: 3);
    }

    videoController!.seekTo(position);
  }

  void onPlayPressed() {
    setState(() {
      // 이미 실행중이면 중지
      if (videoController!.value.isPlaying) {
        videoController!.pause();
        // 실행중이 아니면 실행
      } else {
        videoController!.play();
      }
    });
  }

  void onForwardPressed() {
    // 현재 영상이 어떤 부분인지
    final maxPosition = videoController!.value.duration;
    final currentPosition = videoController!.value.position;

    Duration position = maxPosition;

    if ((maxPosition - const Duration(seconds: 3)).inSeconds > currentPosition.inSeconds) {
      position = currentPosition + const Duration(seconds: 3);
    }

    videoController!.seekTo(position);
  }

  void onNewVideoPressed() {}

  void onChanged(double val) {
    videoController!.seekTo(
      Duration(
        seconds: val.toInt(),
      ),
    );
  }
}

class _Controls extends StatelessWidget {
  final bool isPlaying;
  final VoidCallback onReversePressed;
  final VoidCallback onPlayPressed;
  final VoidCallback onForwardPressed;

  const _Controls({
    required this.isPlaying,
    required this.onReversePressed,
    required this.onPlayPressed,
    required this.onForwardPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height,
      color: Colors.black.withOpacity(0.5),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          renderIconButton(
            onPressed: onReversePressed,
            iconData: Icons.rotate_left,
          ),
          renderIconButton(
            onPressed: onPlayPressed,
            iconData: isPlaying ? Icons.pause : Icons.play_arrow,
          ),
          renderIconButton(
            onPressed: onForwardPressed,
            iconData: Icons.rotate_right,
          ),
        ],
      ),
    );
  }

  Widget renderIconButton({
    required VoidCallback onPressed,
    required IconData iconData,
  }) {
    return IconButton(
      onPressed: onPressed,
      icon: Icon(iconData),
      color: Colors.white,
      iconSize: 30.0,
    );
  }
}

class _NewVideo extends StatelessWidget {
  final VoidCallback onPressed;

  const _NewVideo({required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Positioned(
      right: 0,
      child: IconButton(
        onPressed: onPressed,
        icon: const Icon(Icons.photo_camera_back),
        color: Colors.white,
        iconSize: 30.0,
      ),
    );
  }
}

class _SliderBottom extends StatelessWidget {
  final Duration currentPosition;
  final Duration maxPosition;
  final ValueChanged<double> onChanged;

  const _SliderBottom(
      {required this.maxPosition, required this.currentPosition, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: 0,
      right: 0,
      left: 0,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 8.0),
        child: Row(
          children: [
            Text(
              '${currentPosition.inMinutes}:${(currentPosition.inSeconds % 60).toString().padLeft(2, '0')}',
              style: const TextStyle(color: Colors.white),
            ),
            Expanded(
              child: Slider(
                max: maxPosition.inSeconds.toDouble(),
                min: 0,
                value: currentPosition.inSeconds.toDouble(),
                onChanged: onChanged,
              ),
            ),
            Text(
              '${maxPosition.inMinutes}:${(maxPosition.inSeconds % 60).toString().padLeft(2, '0')}',
              style: const TextStyle(color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}
