from datetime import date

from pydantic import BaseModel


class StampTranslationResponse(BaseModel):
    translation_id: int
    language_code: str

    title: str | None = None
    description: str | None = None
    reason: str | None = None
    historical_significance: str | None = None
    original_usage: str | None = None
    current_status: str | None = None

    class Config:
        from_attributes = True


class StampResponse(BaseModel):
    stamp_id: int
    stamp_number: str | None = None

    subject_name: str

    country_id: int
    country_name: str
    country_code: str | None = None

    catalogue_number: str | None = None

    release_date: str | None = None
    release_year: str | None = None

    denomination: str | None = None
    issue_type: str | None = None
    purpose_type: str | None = None

    image_path: str | None = None
    is_currently_valid: bool

    translation: StampTranslationResponse | None = None