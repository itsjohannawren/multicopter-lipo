Multicopter LiPo Tools
======================

Copyright
---------
(C) 2015 Jeff Walter <jeff@404ster.com>, http://jwalter.sh/  
(C) 2012 Jelle Rinkel <multicopter@forestblue.nl>, http://multicopter.forestblue.nl/

License
-------

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Contributions
-------------
*None yet*

Tools
-----

### flighttime
Calculate approximate flight times and required battery C value based on battery
capacity, flight load, motor draw, and accessory draw.

* URL parameters
    * **css**: URL to external stylesheet
    * **motorsInit**: Initial number of motors (Unit: motors, Default: 4)
    * **motorsMin**: Minimum number of motors (Unit: motors, Default: 1)
    * **motorsMax**: Maximum number of motors (Unit: motors, Default: 12)
    * **motorAmpsInit**: Initial draw per motor (Unit: A, Default: 10)
    * **motorAmpsMin**: Minimum draw per motor (Unit: A, Default: 1)
    * **motorAmpsMax**: Maximum draw per motor (Unit: A, Default: 100)
    * **miscAmpsInit**: Initial accessory draw (Unit: A, Default: 1)
    * **miscAmpsMin**: Minimum accessory draw (Unit: A, Default: 0)
    * **miscAmpsMax**: Maximum accessory draw (Unit: A, Default: 50)
    * **lipoSeriesInit**: Initial number of cells in series (Unit: cells, Default: 3)
    * **lipoSeriesMin**: Minimum number of cells in series (Unit: cells, Default: 1)
    * **lipoSeriesMax**: Maximum number of cells in series (Unit: cells, Default: 10)
    * **lipoMAHInit**: Initial battery capacity (Unit: mAh, Default: 1500)
    * **lipoMAHMin**: Minimum battery capacity (Unit: mAh, Default: 100)
    * **lipoMAHMax**: Maximum battery capacity (Unit: mAh, Default: 10000)
    * **lipoMAHStep**: Battery capacity value step (Unit: mAh, Default: 50)
    * **flyLoadInit**: Initial flight load (Unit: percentage, Default: 40)

