import unittest
import recommendation
from mock import patch, MagicMock
from pymongo import *

class RecommendationTest(unittest.TestCase):

    @patch.object(collection.Collection,'find_one', return_value={
        'order': 1,
        'question': '¿En qué tecnologías estás interesado?',
        'answers': ['Java', 'Python', 'JavaScript', 'SQL', 'NoSQL', 'DevOps'],
        'technology': 'all',
        'type': 'varias'
    })
    def test_first_question(self,mock_collection):

        result = recommendation.first_question()
        mock_collection.assert_called_once_with({'order':1})
        assert result == {
            "answers": [
                "Java",
                "Python",
                "JavaScript",
                "SQL",
                "NoSQL",
                "DevOps"
            ],
            "order": 1,
            "question": "¿En qué tecnologías estás interesado?",
            "type": "varias"
        }

