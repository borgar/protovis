SRC_DIR = ./src

UGLIFY ?= `which uglifyjs`
JSLINT ?= `which jshint`
JSDOC_HOME = "/Library/jsdoc-toolkit"

JS_LANG_FILES = \
	${SRC_DIR}/lang/Array.js

JS_CORE_FILES = \
	${SRC_DIR}/pv.js \
	${SRC_DIR}/pv-internals.js \
	${SRC_DIR}/lang/init.js \
	${SRC_DIR}/text/Format.js \
	${SRC_DIR}/text/DateFormat.js \
	${SRC_DIR}/text/TimeFormat.js \
	${SRC_DIR}/text/NumberFormat.js \
	${SRC_DIR}/data/Arrays.js \
	${SRC_DIR}/data/Numbers.js \
	${SRC_DIR}/data/Objects.js \
	${SRC_DIR}/data/Dom.js \
	${SRC_DIR}/data/Tree.js \
	${SRC_DIR}/data/Nest.js \
	${SRC_DIR}/data/Flatten.js \
	${SRC_DIR}/data/Vector.js \
	${SRC_DIR}/data/Transform.js \
	${SRC_DIR}/data/Scale.js \
	${SRC_DIR}/data/QuantitativeScale.js \
	${SRC_DIR}/data/LinearScale.js \
	${SRC_DIR}/data/LogScale.js \
	${SRC_DIR}/data/RootScale.js \
	${SRC_DIR}/data/OrdinalScale.js \
	${SRC_DIR}/data/QuantileScale.js \
	${SRC_DIR}/data/Histogram.js \
	${SRC_DIR}/color/Color.js \
	${SRC_DIR}/color/Colors.js \
	${SRC_DIR}/color/Ramp.js \
	${SRC_DIR}/scene/SvgScene.js \
	${SRC_DIR}/scene/SvgCurve.js \
	${SRC_DIR}/scene/SvgArea.js \
	${SRC_DIR}/scene/SvgBar.js \
	${SRC_DIR}/scene/SvgDot.js \
	${SRC_DIR}/scene/SvgImage.js \
	${SRC_DIR}/scene/SvgLabel.js \
	${SRC_DIR}/scene/SvgLine.js \
	${SRC_DIR}/scene/SvgPanel.js \
	${SRC_DIR}/scene/SvgRule.js \
	${SRC_DIR}/scene/SvgWedge.js \
	${SRC_DIR}/mark/Mark.js \
	${SRC_DIR}/mark/Anchor.js \
	${SRC_DIR}/mark/Area.js \
	${SRC_DIR}/mark/Bar.js \
	${SRC_DIR}/mark/Dot.js \
	${SRC_DIR}/mark/Label.js \
	${SRC_DIR}/mark/Line.js \
	${SRC_DIR}/mark/Rule.js \
	${SRC_DIR}/mark/Panel.js \
	${SRC_DIR}/mark/Image.js \
	${SRC_DIR}/mark/Wedge.js \
	${SRC_DIR}/mark/Ease.js \
	${SRC_DIR}/mark/Transition.js \
	${SRC_DIR}/mark/Transient.js	

JS_LAYOUT_FILES = \
	${SRC_DIR}/physics/Particle.js \
	${SRC_DIR}/physics/Simulation.js \
	${SRC_DIR}/physics/Quadtree.js \
	${SRC_DIR}/physics/Force.js \
	${SRC_DIR}/physics/ChargeForce.js \
	${SRC_DIR}/physics/DragForce.js \
	${SRC_DIR}/physics/SpringForce.js \
	${SRC_DIR}/physics/Constraint.js \
	${SRC_DIR}/physics/CollisionConstraint.js \
	${SRC_DIR}/physics/PositionConstraint.js \
	${SRC_DIR}/physics/BoundConstraint.js \
	${SRC_DIR}/layout/Layout.js \
	${SRC_DIR}/layout/Network.js \
	${SRC_DIR}/layout/Hierarchy.js \
	${SRC_DIR}/layout/Grid.js \
	${SRC_DIR}/layout/Stack.js \
	${SRC_DIR}/layout/Treemap.js \
	${SRC_DIR}/layout/Tree.js \
	${SRC_DIR}/layout/Indent.js \
	${SRC_DIR}/layout/Pack.js \
	${SRC_DIR}/layout/Force.js \
	${SRC_DIR}/layout/Cluster.js \
	${SRC_DIR}/layout/Partition.js \
	${SRC_DIR}/layout/Arc.js \
	${SRC_DIR}/layout/Horizon.js \
	${SRC_DIR}/layout/Rollup.js \
	${SRC_DIR}/layout/Matrix.js \
	${SRC_DIR}/layout/Bullet.js

JS_BEHAVIOR_FILES = \
	${SRC_DIR}/behavior/Behavior.js \
	${SRC_DIR}/behavior/Drag.js \
	${SRC_DIR}/behavior/Point.js \
	${SRC_DIR}/behavior/Select.js \
	${SRC_DIR}/behavior/Resize.js \
	${SRC_DIR}/behavior/Pan.js \
	${SRC_DIR}/behavior/Zoom.js

JS_GEO_FILES = \
	${SRC_DIR}/geo/Geo.js \
	${SRC_DIR}/geo/LatLng.js \
	${SRC_DIR}/geo/Projection.js \
	${SRC_DIR}/geo/Projections.js \
	${SRC_DIR}/geo/GeoScale.js

JS_FILES = \
	$(JS_LANG_FILES) \
	$(JS_CORE_FILES) \
	$(JS_LAYOUT_FILES) \
	$(JS_BEHAVIOR_FILES) \
	$(JS_GEO_FILES)


all: protovis min

pv: protovis
protovis: protovis.js
min: protovis.min.js

mini: pv.js pv.min.js

lint: protovis.js
	@@if test ! -z ${JSLINT}; then \
		echo "Checking against JSHint..."; \
		${JSLINT} $(JS_FILES) --config ./build/jshint.json; \
	else \
		echo "You must have JSHint installed in order to test."; \
	fi


protovis.js: $(JS_FILES) Makefile
	@@echo "Building" $@
	@@cat $(JS_FILES) > $@

pv.js: $(JS_LANG_FILES) $(JS_CORE_FILES) Makefile
	@@echo "Building" $@
	@@cat $(JS_LANG_FILES) $(JS_CORE_FILES) $(JS_BEHAVIOR_FILES) > $@


%.min.js: %.js Makefile
	@@if test ! -z ${UGLIFY}; then \
		echo "Building" $@; \
		${UGLIFY} < $< > $@; \
	else \
		echo "You must have UglifyJS installed in order to minify the library."; \
	fi

#jsdoc: $(JS_FILES) Makefile
#   rm -rf jsdoc
#   java -jar $(JSDOC_HOME)/jsrun.jar $(JSDOC_HOME)/app/run.js -a -t=$(JSDOC_HOME)/templates/jsdoc -d=$@ -E="^pv-" $(JS_FILES)
 
clean:
	rm -rf protovis.js protovis.min.js jsdoc


.PHONY: all pv protovis lint min clean mini
