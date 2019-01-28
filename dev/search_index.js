var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Introduction",
    "title": "Introduction",
    "category": "page",
    "text": ""
},

{
    "location": "#Introduction-to-ColorSchemeTools-1",
    "page": "Introduction",
    "title": "Introduction to ColorSchemeTools",
    "category": "section",
    "text": "This package provides tools for working with colorschemes and colormaps.For example, you can extract colorschemes from images, and replace an image colorscheme with another.This package relies on:Colors.jl\nColorSchemes.jl\nImages.jl\nClustering.jl"
},

{
    "location": "#Installation-and-basic-usage-1",
    "page": "Introduction",
    "title": "Installation and basic usage",
    "category": "section",
    "text": "Install the package as follows:] add ColorSchemeToolsand to use it:using ColorSchemeToolsOriginal version by cormullion."
},

{
    "location": "tools/#",
    "page": "Tools",
    "title": "Tools",
    "category": "page",
    "text": "DocTestSetup = quote\n    using ColorSchemes, ColorSchemeTools, Colors\nend"
},

{
    "location": "tools/#ColorSchemeTools.extract",
    "page": "Tools",
    "title": "ColorSchemeTools.extract",
    "category": "function",
    "text": "extract(imfile, n=10, i=10, tolerance=0.01; shrink=n)\n\nextract() extracts the most common colors from an image from the image file imfile by finding n dominant colors, using i iterations. You can (and probably should) shrink larger images before running this function.\n\nReturns a ColorScheme.\n\n\n\n\n\n"
},

{
    "location": "tools/#Extracting-colorschemes-from-images-1",
    "page": "Tools",
    "title": "Extracting colorschemes from images",
    "category": "section",
    "text": "You can extract a colorscheme from an image. For example, here\'s an image of a famous painting:(Image: \"the mona lisa\")Use extract() to create a colorscheme from the original image:monalisa = extract(\"monalisa.jpg\", 10, 15, 0.01; shrink=2)which in this example creates a 10-color scheme (using 15 iterations and with a tolerance of 0.01; the image can be reduced in size, here by 2, before processing, to save time).(Image: \"mona lisa extraction\")10-element Array{RGB{Float64},1}:\nRGB{Float64}(0.0406901,0.0412985,0.0423865),\nRGB{Float64}(0.823493,0.611246,0.234261),\nRGB{Float64}(0.374688,0.363066,0.182004),\nRGB{Float64}(0.262235,0.239368,0.110915),\nRGB{Float64}(0.614806,0.428448,0.112495),\nRGB{Float64}(0.139384,0.124466,0.0715472),\nRGB{Float64}(0.627381,0.597513,0.340734),\nRGB{Float64}(0.955276,0.775304,0.37135),\nRGB{Float64}(0.497517,0.4913,0.269587),\nRGB{Float64}(0.880421,0.851357,0.538013),\nRGB{Float64}(0.738879,0.709218,0.441082)](Extracting colorschemes from images requires image importing and exporting abilities. These are platform-specific. On Linux/UNIX, ImageMagick can be used for importing and exporting images. Use QuartzImageIO on macOS.)extract"
},

{
    "location": "tools/#ColorSchemeTools.sortcolorscheme",
    "page": "Tools",
    "title": "ColorSchemeTools.sortcolorscheme",
    "category": "function",
    "text": "sortcolorscheme(colorscheme::ColorScheme, field; kwargs...)\n\nSort (non-destructively) a colorscheme using a field of the LUV colorspace.\n\nThe less than function is lt = (x,y) -> compare_colors(x, y, field).\n\nThe default is to sort by the luminance field :l but could be by :u or :v.\n\nReturns a new ColorScheme.\n\n\n\n\n\n"
},

{
    "location": "tools/#Sorting-color-schemes-1",
    "page": "Tools",
    "title": "Sorting color schemes",
    "category": "section",
    "text": "Use sortcolorscheme() to sort a scheme non-destructively in the LUV color space:using ColorSchemes, ColorSchemeTools, Colors\nsortcolorscheme(ColorSchemes.leonardo)\nsortcolorscheme(ColorSchemes.leonardo, rev=true)The default is to sort colors by their LUV luminance value, but you could try specifying the :u or :v LUV fields instead (sorting colors is another problem domain not really addressed in this package...):sortcolorscheme(ColorSchemes.leonardo, :u)sortcolorscheme"
},

{
    "location": "tools/#ColorSchemeTools.extract_weighted_colors",
    "page": "Tools",
    "title": "ColorSchemeTools.extract_weighted_colors",
    "category": "function",
    "text": "extract_weighted_colors(imfile, n=10, i=10, tolerance=0.01; shrink = 2)\n\nExtract colors and weights of the clusters of colors in an image file. Returns a ColorScheme and weights.\n\nExample:\n\npal, wts = extract_weighted_colors(imfile, n, i, tolerance; shrink = 2)\n\n\n\n\n\n"
},

{
    "location": "tools/#ColorSchemeTools.colorscheme_weighted",
    "page": "Tools",
    "title": "ColorSchemeTools.colorscheme_weighted",
    "category": "function",
    "text": "colorscheme_weighted(colorscheme, weights, length)\n\nReturns a new colorscheme of length length (default 50) where the proportion of each color in colorscheme is represented by the associated weight of each entry.\n\nExamples:\n\ncolorscheme_weighted(extract_weighted_colors(\"hokusai.jpg\")...)\ncolorscheme_weighted(extract_weighted_colors(\"filename00000001.jpg\")..., 500)\n\n\n\n\n\n"
},

{
    "location": "tools/#Weighted-colorschemes-1",
    "page": "Tools",
    "title": "Weighted colorschemes",
    "category": "section",
    "text": "Sometimes an image is dominated by some colors with others occurring less frequently. For example, there may be much more brown than yellow in a particular image. A colorscheme derived from this image can reflect this. You can extract both a set of colors and a set of numerical values or weights that indicate the proportions of colors in the image.using Images\ncs, wts = extract_weighted_colors(\"monalisa.jpg\", 10, 15, 0.01; shrink=2)The colorscheme is now in cs, and wts holds the various weights of each color:wts\n10-element Array{Float64,1}:\n0.0521126446851636\n0.20025391828582884\n0.08954703056671294\n0.09603605342678319\n0.09507086696018234\n0.119987526821047\n0.08042973071297582\n0.08863381567908292\n0.08599068966285295\n0.09193772319937041With the colorscheme and the weights, you can make a colorscheme in which the more common colors take up more space in the scheme:len = 50\ncolorscheme_weighted(cs, wts, len)Or in one go:colorscheme_weighted(extract_weighted_colors(\"monalisa.jpg\")...)Compare the weighted and unweighted versions of schemes extracted from the Hokusai image \"The Great Wave\":(Image: \"unweighted\")(Image: \"weighted\")extract_weighted_colors\ncolorscheme_weighted"
},

{
    "location": "convertingimages/#",
    "page": "Converting image colors",
    "title": "Converting image colors",
    "category": "page",
    "text": ""
},

{
    "location": "convertingimages/#Converting-images-1",
    "page": "Converting image colors",
    "title": "Converting images",
    "category": "section",
    "text": ""
},

{
    "location": "convertingimages/#ColorSchemeTools.convert_to_scheme",
    "page": "Converting image colors",
    "title": "ColorSchemeTools.convert_to_scheme",
    "category": "function",
    "text": "convert_to_scheme(cscheme, img)\n\nConverts img from its current color values to use only the colors defined in cscheme.\n\nimage = nonTransparentImg\nconvert_to_scheme(ColorSchemes.leonardo, image)\nconvert_to_scheme(ColorSchemes.Paired_12, image)\n\n\n\n\n\n"
},

{
    "location": "convertingimages/#Convert-image-from-one-scheme-to-another-1",
    "page": "Converting image colors",
    "title": "Convert image from one scheme to another",
    "category": "section",
    "text": "Using getinverse() it\'s possible to convert an image from one colorscheme to another.convert_to_scheme(cscheme, img) returns a new image in which each pixel from the provided image is mapped to its closest matching color in the provided scheme.using FileIO\n# image created in the ColorSchemes documentation\nimg = load(\"ColorSchemeTools/docs/src/assets/figures/heatmap1.png\")(Image: \"heatmap 1\")Here, the original image is converted to use the GnBu_9 scheme.img1 = save(\"/tmp/t.png\", convert_to_scheme(ColorSchemes.GnBu_9, img))(Image: \"heatmap converted\")convert_to_scheme"
},

{
    "location": "makingschemes/#",
    "page": "Making colorschemes",
    "title": "Making colorschemes",
    "category": "page",
    "text": ""
},

{
    "location": "makingschemes/#Making-new-colorschemes-1",
    "page": "Making colorschemes",
    "title": "Making new colorschemes",
    "category": "section",
    "text": "There are a few functions that can make new ColorSchemes:makelinearsegment_colorscheme\nmakeindexedlist_colorscheme\nmakefunctionalcolorscheme"
},

{
    "location": "makingschemes/#ColorSchemeTools.get_linear_segment_color",
    "page": "Making colorschemes",
    "title": "ColorSchemeTools.get_linear_segment_color",
    "category": "function",
    "text": "get_linear_segment_color(dict, n)\n\nGet the RGB color for value n from a dictionary of linear color segments.\n\nA dictionary where red increases from 0 to 1 over the bottom half, green does the same over the middle half, and blue over the top half, looks like this:\n\ncdict = Dict(:red  => ((0.0,  0.0,  0.0),\n                       (0.5,  1.0,  1.0),\n                       (1.0,  1.0,  1.0)),\n            :green => ((0.0,  0.0,  0.0),\n                       (0.25, 0.0,  0.0),\n                       (0.75, 1.0,  1.0),\n                       (1.0,  1.0,  1.0)),\n            :blue =>  ((0.0,  0.0,  0.0),\n                       (0.5,  0.0,  0.0),\n                       (1.0,  1.0,  1.0)))\n\nThe value of RGB component at every value of n is defined by a set of tuples. In each tuple, the first number is x. Colors are linearly interpolated in bands between consecutive values of x; if the first tuple is given by (Z, A, B) and the second tuple by (X, C, D), the color of a point n between Z and X will be given by (n - Z) / (X - Z) * (C - B) + B.\n\nFor example, given an entry like this:\n\n:red  => ((0.0, 0.0, 0.0),\n          (0.5, 1.0, 1.0),\n          (1.0, 1.0, 1.0))\n\nand if n = 0.75, we return 1.0; 0.75 is between the second and third segments, but we\'d already reached 1.0 (segment 2) when n was 0.5.\n\n\n\n\n\n"
},

{
    "location": "makingschemes/#Linearly-segmented-colors-1",
    "page": "Making colorschemes",
    "title": "Linearly-segmented colors",
    "category": "section",
    "text": "A linearly-segmented color dictionary looks like this:hsv = Dict(:red =>    ((0., 1., 1.),\n                       (0.158730, 1.000000, 1.000000),\n                       (0.174603, 0.968750, 0.968750),\n                       (0.333333, 0.031250, 0.031250),\n                       (0.349206, 0.000000, 0.000000),\n                       (0.666667, 0.000000, 0.000000),\n                       (0.682540, 0.031250, 0.031250),\n                       (0.841270, 0.968750, 0.968750),\n                       (0.857143, 1.000000, 1.000000),\n                       (1.0, 1.0, 1.0)),\n             :green => ((0., 0., 0.),\n                       (0.158730, 0.937500, 0.937500),\n                       (0.174603, 1.000000, 1.000000),\n                       (0.507937, 1.000000, 1.000000),\n                       (0.666667, 0.062500, 0.062500),\n                       (0.682540, 0.000000, 0.000000),\n                       (1.0, 0., 0.)),\n             :blue =>  ((0., 0., 0.),\n                       (0.333333, 0.000000, 0.000000),\n                       (0.349206, 0.062500, 0.062500),\n                       (0.507937, 1.000000, 1.000000),\n                       (0.841270, 1.000000, 1.000000),\n                       (0.857143, 0.937500, 0.937500),\n                       (1.0, 0.09375, 0.09375)))The first number in each tuple for each color increases from 0 to 1, the second and third determine the color values. To create a new ColorScheme from this, decide on a sampling rate, then call get_linear_segment_color() and keep the sampled values.using Colors, ColorSchemes\n\nscheme = RGB[]\n\nfor i in 0:0.01:1\n    push!(scheme, RGB(get_linear_segment_color(_hsv, i)...))\nend\n\nColorScheme(scheme)Make an image from this scheme:using ColorSchemes, FileIO\nimg = colorscheme_to_image(ColorScheme(scheme), 450, 60)\nsave(\"/tmp/linseg.png\", img)(Image: \"linear segmented colorscheme\")get_linear_segment_color"
},

{
    "location": "makingschemes/#Indexed-list-color-schemes-1",
    "page": "Making colorschemes",
    "title": "Indexed-list color schemes",
    "category": "section",
    "text": "An \'indexed list\' color scheme looks like this:gist_rainbow = (\n       (0.000, (1.00, 0.00, 0.16)),\n       (0.030, (1.00, 0.00, 0.00)),\n       (0.215, (1.00, 1.00, 0.00)),\n       (0.400, (0.00, 1.00, 0.00)),\n       (0.586, (0.00, 1.00, 1.00)),\n       (0.770, (0.00, 0.00, 1.00)),\n       (0.954, (1.00, 0.00, 1.00)),\n       (1.000, (1.00, 0.00, 0.75))\n)The first element in each is the point on the color scheme, the second specifies the RGB values at that point.The make_indexed_list_colorscheme(indexedlist) function makes a new ColorScheme from an indexed list.make_indexed_list_colorscheme(gist_rainbow)"
},

{
    "location": "makingschemes/#Functional-color-schemes-1",
    "page": "Making colorschemes",
    "title": "Functional color schemes",
    "category": "section",
    "text": "The colors in a \'functional\' color scheme are produced by three functions that calculate the color values at each point on the scheme.The make_functional_colorscheme() function takes three functions and applies them at each point on the colorscheme.make_functional_colorscheme(sqrt, log, (n) -> n/2)"
},

{
    "location": "output/#",
    "page": "Saving colorschemes",
    "title": "Saving colorschemes",
    "category": "page",
    "text": ""
},

{
    "location": "output/#Saving-colorschemes-1",
    "page": "Saving colorschemes",
    "title": "Saving colorschemes",
    "category": "section",
    "text": ""
},

{
    "location": "output/#ColorSchemeTools.colorscheme_to_image",
    "page": "Saving colorschemes",
    "title": "ColorSchemeTools.colorscheme_to_image",
    "category": "function",
    "text": "colorscheme_to_image(cs, nrows=50, tilewidth=5)\n\nMake an image from a colorscheme by repeating the colors in a colorscheme.\n\nReturns the image as an array.\n\nExamples:\n\nusing FileIO\n\nimg = colorscheme_to_image(ColorSchemes.leonardo, 50, 200)\nsave(\"/tmp/cs_image.png\", img)\n\nsave(\"/tmp/blackbody.png\", colorscheme_to_image(ColorSchemes.blackbody, 10, 100))\n\n\n\n\n\n"
},

{
    "location": "output/#ColorSchemeTools.image_to_swatch",
    "page": "Saving colorschemes",
    "title": "ColorSchemeTools.image_to_swatch",
    "category": "function",
    "text": "image_to_swatch(imagefilepath, samples, destinationpath; nrows=50, tilewidth=5)\n\nExtract a colorscheme from the image in imagefilepath to a swatch image PNG in destinationpath. This just runs sortcolorscheme(), colorscheme_to_image(), and save() in sequence.\n\nSpecify the number of colors. You can also specify the number of rows, and how many times each color is repeated.\n\nimage_to_swatch(\"monalisa.jpg\", 10, \"/tmp/monalisaswatch.png\")\n\n\n\n\n\n"
},

{
    "location": "output/#Saving-colorschemes-as-images-1",
    "page": "Saving colorschemes",
    "title": "Saving colorschemes as images",
    "category": "section",
    "text": "Sometimes you want to save a colorscheme, which is usually just a pixel thick, as a swatch or image. You can do this with colorscheme_to_image(). The second argument is the number of repetitions of each color in the row, the third is the total number of rows. The function returns an image which you can save using FileIO\'s save():using FileIO, ColorSchemeTools, Images, Colors\n\nimg = colorscheme_to_image(ColorSchemes.vermeer, 150, 20)\nsave(\"/tmp/cs_vermeer-150-20.png\", img)(Image: \"vermeer swatch\")The image_to_swatch() function extracts a colorscheme from the image in and saves it as a swatch in a PNG.image_to_swatch(\"/tmp/input.png\", 10, \"/tmp/output.png\")colorscheme_to_image\nimage_to_swatch"
},

{
    "location": "output/#ColorSchemeTools.colorscheme_to_text",
    "page": "Saving colorschemes",
    "title": "ColorSchemeTools.colorscheme_to_text",
    "category": "function",
    "text": "colorscheme_to_text(cscheme::ColorScheme, schemename, filename;\n    category=\"dutch painters\",   # category\n    notes=\"it\'s not really lost\" # notes\n)\n\nWrite a colorscheme to a Julia text file.\n\nExample\n\ncolorscheme_to_text(ColorSchemes.vermeer,\n    \"the_lost_vermeer\",          # name\n    \"/tmp/the_lost_vermeer.jl\",  # file\n    category=\"dutch painters\",   # category\n    notes=\"it\'s not really lost\" # notes\n    )\n\nand read it back in with:\n\ninclude(\"/tmp/the_lost_vermeer.jl\")\n\n\n\n\n\n"
},

{
    "location": "output/#Saving-colorschemes-to-text-files-1",
    "page": "Saving colorschemes",
    "title": "Saving colorschemes to text files",
    "category": "section",
    "text": "You can save a colorscheme as a text file with the imaginatively-titled colorscheme_to_text() function.Remember to make the name a Julia-friendly one, because it will become a symbol and a dictionary key.colorscheme_to_text(ColorSchemes.vermeer,\n        \"the_lost_vermeer\",           # name\n        \"/tmp/the_lost_vermeer.jl\",   # filename\n        category=\"dutch painters\",    # category\n        notes=\"it\'s not really lost\"  # notes\n        )Of course, if you just want the color definitions, you can simply type:map(println, ColorSchemes.vermeer.colors);colorscheme_to_text"
},

{
    "location": "functionindex/#",
    "page": "Index",
    "title": "Index",
    "category": "page",
    "text": ""
},

{
    "location": "functionindex/#Index-1",
    "page": "Index",
    "title": "Index",
    "category": "section",
    "text": ""
},

]}