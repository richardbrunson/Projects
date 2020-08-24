using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;

namespace Mapper
{
	public class MapMaker
	{
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		public class Map
		{
			public enum Type
			{
				World,
				Town,
				Dungeon,

				Count
			}

			public enum Generator
			{
				Splatter,
				RandomWalk,

				Count
			}

			public enum Terrain
			{
				None,
				Boundary,

				Water,
				Desert,
				Forest,
				Hill,
				Marsh,
				Mountain,
				Plains,

				River,
				Road,
				Town,

				Count
			}
			public const byte NoTerrain = (byte) Terrain.None;
			public const string Symbols = ".#~X%@\"A-=+";
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		struct TerrainData
		{
			public byte Terrain;
			public Map.Generator GeneratorMethod;
			public int MinimumLandmassCount;
			public int MaximumLandmassCount;
			public double StepFactor;
			public double MoveFactor;
			public double LinearityFactor;
			public double FillFactor;
			public int FillRadius;
			public double PerimeterRadiusFactor;
			public double PerimeterFactor;
			public int SmoothCount;
			public int CellThreshold;

			public TerrainData(
					byte terrain,
					Map.Generator generatorMethod,
					int minimumLandmassCount,
					int maximumLandmassCount,
					double stepFactor,
					double moveFactor,
					double linearityFactor,
					double fillFactor,
					int fillRadius,
					double perimeterRadiusFactor,
					double perimeterFactor,
					int smoothCount,
					int cellThreshold
				)
			{
				Terrain = terrain;
				GeneratorMethod = generatorMethod;
				MinimumLandmassCount = minimumLandmassCount;
				MaximumLandmassCount = maximumLandmassCount;
				StepFactor = stepFactor;
				MoveFactor = moveFactor;
				LinearityFactor = linearityFactor;
				FillFactor = fillFactor;
				FillRadius = fillRadius;
				PerimeterRadiusFactor = perimeterRadiusFactor;
				PerimeterFactor = perimeterFactor;
				SmoothCount = smoothCount;
				CellThreshold = cellThreshold;
			}
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		Random RandomNumber = new Random();

		Map.Type MapType;
		int MapWidth;
		int MapHeight;
		byte[ , ] MapData;

		Dictionary<Map.Terrain, TerrainData> Terrains = new Dictionary<Map.Terrain, TerrainData>();
		Dictionary<byte, Color> Colors = new Dictionary<byte, Color>();

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		float Clamp( float value, float minValue, float maxValue )
		{
			return Math.Max( Math.Min( maxValue, value ), minValue );
		}

		int Clamp( int value, int minValue, int maxValue )
		{
			return (int) Clamp( (float) value, (float) minValue, (float) maxValue );
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		void Clear( byte[ , ] map )
		{
			int width = map.GetLength( 0 );
			int height = map.GetLength( 1 );
			int i;
			int j;

			for ( i = 0; i < width; i++ )
			{
				for ( j = 0; j < height; j++ )
				{
					map[ i, j ] = Map.NoTerrain;
				}
			}
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		void Copy( byte[ , ] map )
		{
			int width = map.GetLength( 0 );
			int height = map.GetLength( 1 );
			int i;
			int j;

			for ( i = 0; i < width; i++ )
			{
				for ( j = 0; j < height; j++ )
				{
					MapData[ i, j ] = map[ i, j ];
				}
			}
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		void Fill( TerrainData terrainData, int x, int y )
		{
			int i, iLo, iHi;
			int j, jLo, jHi;

			iLo = Clamp( x - terrainData.FillRadius, 0, MapWidth - 1 );
			iHi = Clamp( x + terrainData.FillRadius, 0, MapWidth - 1 );
			jLo = Clamp( y - terrainData.FillRadius, 0, MapHeight - 1 );
			jHi = Clamp( y + terrainData.FillRadius, 0, MapHeight - 1 );

			for ( i = iLo; i <= iHi; i++ )
			{
				for ( j = jLo; j <= jHi; j++ )
				{
					if ( RandomNumber.NextDouble() <= terrainData.FillFactor )
					{
						MapData[ i, j ] = terrainData.Terrain;
					}
				}
			}
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		void RoughenPerimeter( TerrainData terrainData )
		{
			if ( terrainData.PerimeterRadiusFactor > 0.0d )
			{
				int perimeter = (int) Math.Round( (double) MapWidth * terrainData.PerimeterRadiusFactor );
				int i;
				int iHi = MapWidth - perimeter - 1;
				int j;
				int jHi = MapHeight - perimeter - 1;

				for ( i = 0; i < MapWidth; i++ )
				{
					for ( j = 0; j < MapHeight; j++ )
					{
						if ( ( i < perimeter || i > iHi ) || ( j < perimeter || j > jHi ) )
						{
							if ( RandomNumber.NextDouble() <= terrainData.PerimeterFactor )
							{
								MapData[ i, j ] = Map.NoTerrain;
							}
						}
					}
				}
			}
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		void Smooth( TerrainData terrainData )
		{
			byte[ , ] map = new byte[ MapWidth, MapHeight ];

			Clear( map );

			// apply cellular automata
			int i;
			int iLimit = MapWidth - 1;
			int j;
			int jLimit = MapHeight - 1;
			int k, kLo, kHi;
			int l, lLo, lHi;
			int count;

			for ( i = 1; i < iLimit; i++ )
			{
				for ( j = 1; j < jLimit; j++ )
				{
					kLo = i - 1;
					kHi = i + 2;
					lLo = j - 1;
					lHi = j + 2;

					count = 0;

					for ( k = kLo; k < kHi; k++ )
					{
						for ( l = lLo; l < lHi; l++ )
						{
							count += ( MapData[ k, l ] == terrainData.Terrain ? 1 : 0 );
						}
					}

					if ( count >= terrainData.CellThreshold )
					{
						map[ i, j ] = terrainData.Terrain;
					}
				}
			}

			Copy( map );
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		void Center( TerrainData terrainData )
		{
			byte[ , ] map = new byte[ MapWidth, MapHeight ];
			int i, j;
			int left = MapWidth + 1;
			int top = MapHeight + 1;
			int bottom = -1;
			int right = -1;

			Clear( map );

			// set map boundaries
			for ( i = 0; i < MapWidth; i++ )
			{
				for ( j = 0; j < MapHeight; j++ )
				{
					map[ i, j ] = MapData[ i, j ];

					if ( map[ i, j ] == terrainData.Terrain )
					{
						left = Math.Min( left, i );
						top = Math.Min( top, j );
						bottom = Math.Max( bottom, j );
						right = Math.Max( right, i );
					}
				}
			}

			// center map
			Clear( MapData );

			int width = right - left + 1;
			int height = bottom - top + 1;
			int xOffset = ( MapWidth - width ) / 2;
			int yOffset = ( MapHeight - height ) / 2;

			width++;
			height++;

			for ( i = 0; i < width; i++ )
			{
				for ( j = 0; j < height; j++ )
				{
					MapData[ i + xOffset, j + yOffset ] = map[ i + left, j + top ];
				}
			}
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		string Draw()
		{
			StringBuilder draw = new StringBuilder( "" );
			int i;
			int j;

			for ( i = 0; i < MapWidth; i++ )
			{
				for ( j = 0; j < MapHeight; j++ )
				{
					draw.Append( Map.Symbols.Substring( (int) MapData[ i, j ], 1 ) );
				}

				draw.Append( "\r\n" );
			}

			return draw.ToString();
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		public string Generate()
		{
			////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////
			TerrainData terrainData = Terrains[ Map.Terrain.Boundary ];
			////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////

			const double Circle = Math.PI * 2.0d;
			int landmassCount = RandomNumber.Next( terrainData.MinimumLandmassCount, terrainData.MaximumLandmassCount + 1 );
			int landmass;
			int stepCount = (int) Math.Round( (double) MapWidth * (double) MapHeight * terrainData.StepFactor );
			stepCount = RandomNumber.Next( (int) Math.Round( (double) stepCount * ( 1.0d - terrainData.StepFactor ) ), (int) Math.Round( (double) stepCount * ( 1.0d + terrainData.StepFactor ) ) );
			int step;
			double theta;
			int x;
			int y;

			for ( landmass = 0; landmass < landmassCount; landmass++ )
			{
				switch ( terrainData.GeneratorMethod )
				{
					case Map.Generator.RandomWalk:
						theta = RandomNumber.NextDouble() * Circle;
						x = RandomNumber.Next( 0, MapWidth );
						y = RandomNumber.Next( 0, MapHeight );

						for ( step = 0; step < stepCount; step++ )
						{
							Fill( terrainData, x, y );

							theta += ( RandomNumber.NextDouble() - 0.5d ) * ( 1.0d - terrainData.LinearityFactor ) * Circle;
							x = Clamp( x + (int) Math.Round( terrainData.MoveFactor * Math.Cos( theta ) ), 0, MapWidth );
							y = Clamp( y + (int) Math.Round( terrainData.MoveFactor * Math.Sin( theta ) ), 0, MapHeight );
						}

						break;
					default: // splatter
						for ( step = 0; step < stepCount; step++ )
						{
							Fill(
									terrainData,
									RandomNumber.Next( 0, MapWidth ),
									RandomNumber.Next( 0, MapHeight )
								);
						}

						break;
				}
			}

			RoughenPerimeter( terrainData );

			int i;
			for ( i = 0; i < terrainData.SmoothCount; i++ )
			{
				Smooth( terrainData );
			}

			Center( terrainData );

			return Draw();
		}

		public void Generate( Bitmap bitmap )
		{
			Generate();

			int i;
			int j;
			for ( i = 0; i < MapWidth; i++ )
			{
				for ( j = 0; j < MapHeight; j++ )
				{
					bitmap.SetPixel( i, j, Colors[ MapData[ i, j ] ] );
				}
			}
		}



		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// constructor
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		public MapMaker( Map.Type mapType, int mapWidth, int mapHeight )
		{
			// map and dimensions
			MapType = mapType;
			MapWidth = mapWidth;
			MapHeight = mapHeight;
			MapData = new byte[ MapWidth, MapHeight ];

			Clear( MapData );

			// terrains
			Terrains.Add(
					Map.Terrain.Boundary,
					new TerrainData(
							(byte) Map.Terrain.Boundary,
							Map.Generator.RandomWalk,
							1, // MinimumLandmassCount
							4, // MaximumLandmassCount
							0.375d, // StepFactor
							1.25d, // MoveFactor
							0.0d, // LinearityFactor
							0.5d, // FillFactor
							3, // FillRadius
							0.25d, // PerimeterRadiusFactor
							0.25d, // PerimeterFactor
							3, // SmoothCount
							5 // CellThreshold
						)
				);

			// colors
			Colors.Add( (byte) Map.Terrain.None, Color.Black );
			Colors.Add( (byte) Map.Terrain.Boundary, Color.White );
		}
	}
}
