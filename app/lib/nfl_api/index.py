from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd


PBP = 'https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_'
ROSTER = 'https://github.com/nflverse/nflverse-data/releases/download/rosters/roster_'
PLAYER_STATS = 'https://github.com/nflverse/nflverse-data/releases/download/player_stats/player_stats_'

app = Flask(__name__)
CORS(app)


@app.route("/nfl_api/pbp/<year>", methods=['GET'])
def get_play_by_play(year):
    data = pd.read_csv(PBP + str(year) + '.csv', low_memory=False)

    # keep only important columns
    data = data[['play_id', 'game_id', 'old_game_id', 'home_team', 'away_team', 'season_type', 'week',
                 'posteam', 'posteam_type', 'defteam', 'side_of_field', 'yardline_100', 'game_date',
                 'quarter_seconds_remaining', 'half_seconds_remaining', 'game_seconds_remaining',
                 'game_half', 'quarter_end', 'drive', 'sp', 'qtr', 'down', 'goal_to_go', 'time', 'yrdln',
                 'ydstogo', 'ydsnet', 'desc', 'play_type', 'yards_gained', 'shotgun', 'no_huddle', 'qb_dropback',
                 'qb_kneel', 'qb_spike', 'qb_scramble', 'pass_length', 'pass_location', 'air_yards', 'yards_after_catch',
                 'run_location', 'run_gap', 'field_goal_result', 'kick_distance', 'extra_point_result', 'two_point_conv_result',
                 'home_timeouts_remaining', 'away_timeouts_remaining', 'timeout', 'timeout_team', 'td_team', 'td_player_name',
                 'td_player_id', 'posteam_timeouts_remaining', 'defteam_timeouts_remaining', 'total_home_score', 'total_away_score',
                 'posteam_score', 'defteam_score', 'score_differential', 'posteam_score_post', 'defteam_score_post', 'score_differential_post',
                 'no_score_prob', 'opp_fg_prob', 'opp_safety_prob', 'opp_td_prob', 'fg_prob', 'safety_prob', 'td_prob', 'extra_point_prob',
                 'two_point_conversion_prob', 'ep', 'epa', 'total_home_epa', 'total_away_epa', 'total_home_rush_epa', 'total_away_rush_epa',
                 'total_home_pass_epa', 'total_away_pass_epa', 'air_epa', 'yac_epa', 'comp_air_epa', 'comp_yac_epa', 'total_home_comp_air_epa',
                 'total_away_comp_air_epa', 'total_home_comp_yac_epa', 'total_away_comp_yac_epa', 'total_home_raw_air_epa', 'total_away_raw_air_epa',
                 'total_home_raw_yac_epa', 'total_away_raw_yac_epa', 'wp', 'def_wp', 'home_wp', 'away_wp', 'wpa', 'vegas_wpa', 'vegas_home_wpa',
                 'home_wp_post', 'away_wp_post', 'vegas_wp', 'vegas_home_wp', 'total_home_rush_wpa', 'total_away_rush_wpa', 'total_home_pass_wpa',
                 'total_away_pass_wpa', 'air_wpa', 'yac_wpa', 'comp_air_wpa', 'comp_yac_wpa', 'total_home_comp_air_wpa', 'total_away_comp_air_wpa',
                 'total_home_comp_yac_wpa', 'total_away_comp_yac_wpa', 'total_home_raw_air_wpa', 'total_away_raw_air_wpa', 'total_home_raw_yac_wpa', 'total_away_raw_yac_wpa',
                 'punt_blocked', 'first_down_rush', 'first_down_pass', 'first_down_penalty', 'third_down_converted', 'third_down_failed', 'fourth_down_converted',
                 'fourth_down_failed', 'incomplete_pass', 'touchback', 'interception', 'punt_inside_twenty', 'punt_in_endzone', 'punt_out_of_bounds', 'punt_downed',
                 'punt_fair_catch', 'kickoff_inside_twenty', 'kickoff_in_endzone', 'kickoff_out_of_bounds', 'kickoff_downed', 'kickoff_fair_catch', 'fumble_forced',
                 'fumble_not_forced', 'fumble_out_of_bounds', 'solo_tackle', 'safety', 'penalty', 'tackled_for_loss' 'fumble_lost', 'own_kickoff_recovery',
                 'own_kickoff_recovery_td', 'qb_hit', 'rush_attempt', 'pass_attempt', 'sack', 'touchdown', 'pass_touchdown', 'rush_touchdown', 'return_touchdown',
                 'extra_point_attempt', 'two_point_attempt', 'field_goal_attempt', 'kickoff_attempt', 'punt_attempt', 'fumble',  'complete_pass', 'assist_tackle',
                 'lateral_reception', 'lateral_rush', 'lateral_return', 'lateral_recovery', 'passer_player_id', 'passer_player_name', 'passing_yards', 'receiver_player_id',
                 'receiver_player_name', 'receiving_yards', 'rusher_player_id', 'rusher_player_name', 'rushing_yards', 'lateral_receiver_player_id', 'lateral_receiver_player_name',
                 'lateral_receiving_yards', 'lateral_rusher_player_id', 'lateral_rusher_player_name', 'lateral_rushing_yards', 'lateral_sack_player_id', 'lateral_sack_player_name',
                 'interception_player_id', 'interception_player_name', 'lateral_interception_player_id', 'lateral_interception_player_name', 'punt_returner_player_id',
                 'punt_returner_player_name', 'lateral_punt_returner_player_id', 'lateral_punt_returner_player_name', 'kickoff_returner_player_name',
                 'kickoff_returner_player_id', 'lateral_kickoff_returner_player_id', 'lateral_kickoff_returner_player_name', 'punter_player_id', 'punter_player_name',
                 'kicker_player_name', 'kicker_player_id', 'own_kickoff_recovery_player_id', 'own_kickoff_recovery_player_name', 'blocked_player_id', 'blocked_player_name',
                 'tackle_for_loss_1_player_id', 'tackle_for_loss_1_player_name', 'tackle_for_loss_2_player_id', 'tackle_for_loss_2_player_name',
                 'qb_hit_1_player_id', 'qb_hit_1_player_name', 'qb_hit_2_player_id', 'qb_hit_2_player_name', 'forced_fumble_player_1_team',
                 'forced_fumble_player_1_player_id', 'forced_fumble_player_1_player_name', 'forced_fumble_player_2_team',
                 'forced_fumble_player_2_player_id', 'forced_fumble_player_2_player_name', 'solo_tackle_1_team', 'solo_tackle_2_team',
                 'solo_tackle_1_player_id', 'solo_tackle_2_player_id', 'solo_tackle_1_player_name', 'solo_tackle_2_player_name',
                 'assist_tackle_1_player_id', 'assist_tackle_1_player_name', 'assist_tackle_1_team', 'assist_tackle_2_player_id',
                 'assist_tackle_2_player_name', 'assist_tackle_2_team', 'assist_tackle_3_player_id', 'assist_tackle_3_player_name', 'assist_tackle_3_team',
                 'assist_tackle_4_player_id', 'assist_tackle_4_player_name', 'assist_tackle_4_team', 'tackle_with_assist',
                 'tackle_with_assist_1_player_id', 'tackle_with_assist_1_player_name', 'tackle_with_assist_1_team', 'tackle_with_assist_2_player_id',
                 'tackle_with_assist_2_player_name', 'tackle_with_assist_2_team', 'pass_defense_1_player_id', 'pass_defense_1_player_name',
                 'pass_defense_2_player_id', 'pass_defense_2_player_name', 'fumbled_1_team', 'fumbled_1_player_id', 'fumbled_1_player_name',
                 'fumbled_2_player_id', 'fumbled_2_player_name']]

    # fill number columns with 0 and string columns with ""
    data[data.select_dtypes(include=['number']).columns] = data[data.select_dtypes(
        include=['number']).columns].fillna(0)
    data[data.select_dtypes(include=['object']).columns] = data[data.select_dtypes(
        include=['object']).columns].fillna('')

    data = jsonify(data.to_dict(orient='records'))
    return data


@app.route("/nfl_api/roster/<year>", methods=['GET'])
def get_roster(year):
    data = pd.read_csv(ROSTER + str(year) + '.csv', low_memory=False)

    # keep only important columns
    data = data[['season', 'team', 'position', 'depth_chart_position', 'jersey_number', 'status', 'full_name', 'first_name', 'last_name', 'birth_date', 'height',
                 'weight', 'college', 'gsis_id', 'years_exp', 'headshot_url', 'ngs_position', 'status_description_abbr', 'rookie_year', 'draft_club', 'draft_number']]

    # fill number columns with 0 and string columns with ""
    data[data.select_dtypes(include=['number']).columns] = data[data.select_dtypes(
        include=['number']).columns].fillna(0)
    data[data.select_dtypes(include=['object']).columns] = data[data.select_dtypes(
        include=['object']).columns].fillna('')

    # add primary key
    data['id'] = data['gsis_id'].astype(str) + '_' + data['season'].astype(str)

    data = jsonify(data.to_dict(orient='records'))
    return data


@app.route("/nfl_api/player_stats/<year>", methods=['GET'])
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
    app.run(debug=True, port=8080)
