from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd


PBP = 'https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_'
ROSTER = 'https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_'
PLAYER_STATS = 'https://github.com/nflverse/nflverse-data/releases/download/player_stats/player_stats_'


def get_player_stats(year):
    data = pd.read_csv(PLAYER_STATS + str(year) + '.csv', low_memory=False)

    # keep only important columns
    data = data[['player_id', 'player_name', 'player_display_name', 'position',
                 'position_group', 'recent_team', 'season', 'week',
                 'season_type', 'opponent_team', 'completions', 'attempts',
                 'passing_yards', 'passing_tds', 'interceptions', 'sacks', 'sack_yards',
                 'sack_fumbles', 'sack_fumbles_lost', 'passing_air_yards',
                 'passing_yards_after_catch', 'passing_first_downs', 'passing_epa',
                 'passing_2pt_conversions', 'pacr', 'dakota', 'carries', 'rushing_yards',
                 'rushing_tds', 'rushing_fumbles', 'rushing_fumbles_lost',
                 'rushing_first_downs', 'rushing_epa', 'rushing_2pt_conversions',
                 'receptions', 'targets', 'receiving_yards', 'receiving_tds',
                 'receiving_fumbles', 'receiving_fumbles_lost', 'receiving_air_yards',
                 'receiving_yards_after_catch', 'receiving_first_downs', 'receiving_epa',
                 'receiving_2pt_conversions', 'racr', 'target_share', 'air_yards_share',
                 'wopr', 'special_teams_tds', 'fantasy_points', 'fantasy_points_ppr']]

    # fill number columns with 0 and string columns with ""
    data[data.select_dtypes(include=['number']).columns] = data[data.select_dtypes(
        include=['number']).columns].fillna(0)
    data[data.select_dtypes(include=['object']).columns] = data[data.select_dtypes(
        include=['object']).columns].fillna('')

    # add primary key
    data['id'] = data['player_id'].astype(str) + '_' + data['season'].astype(str) + '_' + data['week'].astype(str)
    data = jsonify(data.to_dict(orient='records'))
    return data


if __name__ == '__main__':
    get_player_stats(2023)

