# Image-Batch-Resizer

A command line tool to easily resize a bunch of images to a bunch of different sizes.

## Getting Started

The tool uses the [gm library](https://github.com/aheckmann/gm), which itself requires the installation of 
[ImageMagick](http://www.imagemagick.org/script/index.php) or [GraphicsMagick](http://www.graphicsmagick.org/). 
See their [instructions](https://github.com/aheckmann/gm#getting-started) for getting started on the gm library page
for more info.

After that, you can install the tool by simply running `npm install image-batch-resizer`

You can run it using the command line like this:
```bash
image-batch-resizer --input imagesdir1 --input single.jpg --output outputdir --size 200x200 --size 300x300 --size 250x200
```

This example reads in the files in directory imagesdir1 and additionally the file single.jpg. It resizes the input
images to the sizes 200x200, 300x300, 250x200 (width x height). It will save the resized files in the outputdir, and 
produces the following output (assuming the imagesdir1 contains the files folderfile1.jpg and folderfile2.jpg):

* outputdir/folderfile1/original.jpg
* outputdir/folderfile1/200x200.jpg
* outputdir/folderfile1/300x300.jpg
* outputdir/folderfile1/250x200.jpg
* outputdir/folderfile2/original.jpg
* outputdir/folderfile2/200x200.jpg
* outputdir/folderfile2/300x300.jpg
* outputdir/folderfile2/250x200.jpg
* outputdir/single/original.jpg
* outputdir/single/200x200.jpg
* outputdir/single/300x300.jpg
* outputdir/single/250x200.jpg


## Documentation

The following command line parameters can be used:

* -i or --input (required): Use it to give the tool the image files you want to be resized. You can use -i multiple times to give it multiple inputs, where the input value can be either a file or a directory.
* -o or --output (required): Tell the tool where to store the output files. It will create a separate directory in the output folder for every resized image. All input images will be copied named original. The resized files will be named according to their size. Example: Input=example.jpg => Output= output/example/original.jpg und output/example/200x200.jpg 
* -s or --size (required): Use it to define different target sizes in the format XxY, e.g., 200x300 or 250x200. You can use it multiple times for all needed target sizes.
* -c or --clearOutput (optional): Use this parameter (just name it, no need for a value) to clear the output directory before copying over the resized images. It just runs a `rm -rf` on the output directory. If you don't set the flag, we will use the output directory as is, but we won't override any file.


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

Any contribution is welcome, for example:

* Send us Feature Requests or Bug reports or any questions in the [Issues section](https://github.com/BrightSnowman/image-batch-resizer/issues?milestone=&page=1&state=open)
* Send a Pull Request for an existing Issue and become author of the tool
* Just write an email (or whatever you prefer) and give us some feedback


## License
Copyright (c) 2013 Alexander Kohout  
Licensed under the MIT license.
