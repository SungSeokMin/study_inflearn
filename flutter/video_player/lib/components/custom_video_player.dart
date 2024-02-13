import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:video_player/video_player.dart';

class CustonVideoPlayer extends StatefulWidget {
  final XFile video;

  const CustonVideoPlayer({super.key, required this.video});

  @override
  State<CustonVideoPlayer> createState() => _CustonVideoPlayerState();
}

class _CustonVideoPlayerState extends State<CustonVideoPlayer> {
  VideoPlayerController? videoController;

  @override
  void initState() {
    super.initState();

    videoController = VideoPlayerController.file(
      File(widget.video.path),
    );

    initializeController();
  }

  initializeController() async {
    await videoController!.initialize();

    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    if (videoController == null) {
      return const CircularProgressIndicator();
    }

    return VideoPlayer(videoController!);
  }
}
